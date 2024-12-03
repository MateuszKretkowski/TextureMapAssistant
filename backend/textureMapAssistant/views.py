from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
import io
import zipfile

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
