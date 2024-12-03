from PIL import Image
import random

def ColorDuplicatePicker(texturePath):
    texture = Image.open(texturePath)
    colors = {
        "rgb": 0,
        }
    for pixelX in range(texture.width):
        for pixelY in range(texture.height):
            color = texture.getpixel((pixelX, pixelY))
            if (len(color) == 4):
                r, g, b, a = color
                alpha = a
            if color in colors and alpha > 0:
                print("There is one, or more duplicate colors: ", color, " at pixel: ", pixelX, " : ", pixelY)
                return
            else:
                colors[color] = (pixelX, pixelY)
    print("There is NONE duplicate pixels")
    return

def SimpleColorMap(texturePath, width, height, outputPath):
    texture = Image.open(texturePath)
    image = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    imagePixels = image.load()
    newColorsList = []
    for pixelX in range(texture.width):
        for pixelY in range(texture.height):
            color = texture.getpixel((pixelX, pixelY))
            r, g, b, a = color
            alpha = a
            if alpha > 0:
                randomColor = (random.randrange(0, 255), random.randrange(0, 255), random.randrange(0, 255), 255)
                if randomColor in newColorsList:
                    print("There is a duplicate in the reworked Texture")
                else:
                    imagePixels[pixelX, pixelY] = randomColor
                newColorsList.append(randomColor)
    image.save(outputPath)

def ColorMapWithShades(texturePath, width, height, blockSize, outputPath):
    texture = Image.open(texturePath)
    image = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    imagePixels = image.load()

    colors = [(255, 0, 0), (0, 255, 0), (0, 0, 255)]
    currentColorIndex = 0
    colorsList = []

    for pixelX in range(texture.width):
        for pixelY in range(texture.height):
            color = texture.getpixel((pixelX, pixelY))
            _, _, _, alpha = color
            
            if alpha > 0:
                baseColor = colors[currentColorIndex]
                
                randomShade = (
                    baseColor[0] + random.randint(-50, 50),
                    baseColor[1] + random.randint(-50, 50),
                    baseColor[2] + random.randint(-50, 50),
                    255
                )
                randomShade = tuple(max(0, min(255, c)) for c in randomShade)

                while randomShade in colorsList:
                    print("There is a DUPLICATE, re-rolling...")
                    randomShade = (
                        baseColor[0] + random.randint(-50, 50),
                        baseColor[1] + random.randint(-50, 50),
                        baseColor[2] + random.randint(-50, 50),
                        255
                    )
                    randomShade = tuple(max(0, min(255, c)) for c in randomShade)

                if randomShade in colorsList:
                    print("there is STILL a duplicate")
                else:
                    imagePixels[pixelX, pixelY] = randomShade
                    colorsList.append(randomShade)

            if (pixelX % blockSize == blockSize-1) and (pixelY % blockSize  == blockSize-1):
                currentColorIndex = (currentColorIndex + 1) % len(colors)

    image.save(outputPath)