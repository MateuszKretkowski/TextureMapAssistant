from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
import io
import zipfile

from django.http import JsonResponse
from PIL import Image
import io
import random

@csrf_exempt
def simple_color_paint(request):
    try:
        # Akceptowanie tylko metody POST
        if request.method != "POST":
            return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

        # Pobranie pliku obrazu z request.FILES
        texture_file = request.FILES.get("texturePath")
        if not texture_file:
            return JsonResponse({"error": "No texture file received."}, status=400)

        # Pobranie szerokości i wysokości obrazu
        try:
            width = int(request.POST.get("width"))
            height = int(request.POST.get("height"))
        except (TypeError, ValueError):
            return JsonResponse({"error": "Invalid width or height provided."}, status=400)

        # Wczytanie obrazu z przesłanego pliku
        try:
            texture = Image.open(texture_file)
        except Exception as e:
            return JsonResponse({"error": f"Unable to open the image file. Error: {str(e)}"}, status=400)

        # Tworzenie nowego obrazu o podanych wymiarach
        image = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        image_pixels = image.load()
        new_colors_list = []

        # Przetwarzanie pikseli
        for pixelX in range(texture.width):
            for pixelY in range(texture.height):
                color = texture.getpixel((pixelX, pixelY))
                r, g, b, a = color
                alpha = a
                if alpha > 0:
                    random_color = (
                        random.randrange(0, 255),
                        random.randrange(0, 255),
                        random.randrange(0, 255),
                        255,
                    )
                    if random_color in new_colors_list:
                        print("There is a duplicate in the reworked Texture")
                    else:
                        image_pixels[pixelX, pixelY] = random_color
                    new_colors_list.append(random_color)

        # Zapisanie nowego obrazu w pamięci
        output_buffer = io.BytesIO()
        image.save(output_buffer, format="PNG")
        output_buffer.seek(0)

        # Przygotowanie odpowiedzi z nowym obrazem
        response = HttpResponse(output_buffer, content_type="image/png")
        response["Content-Disposition"] = 'attachment; filename="colormap.png"'
        return response

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def color_duplicate_picker(request):
    try:
        # Sprawdzenie metody żądania
        if request.method != "POST":
            return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

        # Pobranie pliku obrazu z request.FILES
        texture_file = request.FILES.get("texturePath")
        if not texture_file:
            return JsonResponse({"error": "No texture file received."}, status=400)

        # Wczytanie obrazu
        try:
            texture = Image.open(texture_file)
        except Exception as e:
            return JsonResponse({"error": f"Unable to open the image file. Error: {str(e)}"}, status=400)

        colors = {}
        duplicate_found = False

        # Iteracja przez piksele obrazu
        for pixelX in range(texture.width):
            for pixelY in range(texture.height):
                color = texture.getpixel((pixelX, pixelY))
                if len(color) == 4:  # RGBA format
                    r, g, b, a = color
                    alpha = a
                else:
                    alpha = 255  # Default alpha for RGB images

                # Sprawdzanie powtarzających się kolorów
                if alpha > 0:  # Uwzględnienie tylko pikseli widocznych
                    if color in colors:
                        duplicate_found = True
                        duplicate_info = {
                            "color": color,
                            "pixel_coordinates": (pixelX, pixelY),
                            "duplicate_coordinates": colors[color]
                        }
                        return JsonResponse({
                            "message": "Duplicate color found.",
                            "details": duplicate_info
                        })

                    colors[color] = (pixelX, pixelY)

        if not duplicate_found:
            return JsonResponse({"message": "No duplicate colors found!"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def get_texture_bits(request):
    try:
        if request.method != "POST":
            return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

        # Debugging POST and FILES
        print("POST data:", request.POST)
        print("FILES data:", request.FILES)

        texture_file = request.FILES.get("texturePath")
        if not texture_file:
            print("Error: No file received.")
            return JsonResponse({"error": "No file received."}, status=400)

        objects_list = request.POST.getlist("objectsList")
        if not objects_list:
            print("Error: No objects list received.")
            return JsonResponse({"error": "No objects list received."}, status=400)

        width = int(request.POST.get("width"))
        height = int(request.POST.get("height"))
        map_width = int(request.POST.get("mapWidth"))
        map_height = int(request.POST.get("mapHeight"))

        texture = Image.open(texture_file)
        max_map_width = texture.size[0] // width
        max_map_height = texture.size[1] // height

        if map_width > max_map_width or map_height > max_map_height:
            print("Error: Map dimensions exceed texture size.")
            return JsonResponse({
                "error": f"Map dimensions exceed texture size. Max mapWidth={max_map_width}, Max mapHeight={max_map_height}"
            }, status=400)

        # Tworzenie pliku ZIP
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
            list_index = 0
            for u in range(map_width):
                for i in range(map_height):
                    if list_index >= len(objects_list):
                        break

                    # Tworzenie nowego fragmentu obrazu
                    print(f"Creating fragment for object: {objects_list[list_index]}")
                    image = Image.new("RGBA", (width, height), (0, 0, 0, 0))
                    image_pixels = image.load()
                    x_offset = width * u
                    y_offset = height * i

                    for x in range(width):
                        for y in range(height):
                            try:
                                color = texture.getpixel((x + x_offset, y + y_offset))
                                image_pixels[x, y] = color
                            except IndexError:
                                print(f"Pixel out of bounds at ({x + x_offset}, {y + y_offset})")
                                return JsonResponse({"error": "Pixel coordinates out of bounds."}, status=400)

                    # Zapis fragmentu obrazu do pamięci jako PNG
                    image_buffer = io.BytesIO()
                    image.save(image_buffer, format="PNG")
                    image_buffer.seek(0)

                    # Dodanie obrazu do ZIP
                    file_name = f"{objects_list[list_index]}.png"
                    print(f"Adding {file_name} to ZIP")
                    zip_file.writestr(file_name, image_buffer.read())
                    list_index += 1

        # Przygotowanie odpowiedzi z plikiem ZIP
        zip_buffer.seek(0)
        response = HttpResponse(zip_buffer.getvalue(), content_type="application/zip")
        response["Content-Disposition"] = 'attachment; filename="textures.zip"'
        return response

    except Exception as e:
        print(f"Unhandled error: {e}")
        return JsonResponse({"error": str(e)}, status=500)
