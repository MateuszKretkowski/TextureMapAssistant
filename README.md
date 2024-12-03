# ***Texture Map Assistant***

**This Repo will help you determine, if your map has been correctly colored.**

**If your map ISN'T properly colored, don't worry! We have a function which automatically paints your _ENTIRE_ Map.**
#
The colors may look the same, but they aren't. If you are curious, you can check your reworked map in the ColorDuplicatePicker.
#

## Parameters
- The Canvas of your map can be however big you want it to be.
- blockSize is your object size for example: (Left Leg: 16px x 16px), so blockSize=16
- texturePath: texture path of the original {obj}.map.png
- outputPath: output path for your reworked map to save

## Functions, and how to use them
- First, we have a ***ColorDuplicatePicker*** which catches the first element that is duplicate. In this way we know our map is wrongly colored, and needs _CHANGE_
- Second Function: SimpleColorMap, has a basic coloring option, which colors randomly your map. It is for those who don't have any small objects that the map consists of.
- And the ***THIRD*** option: ColorMapWithShades, which Colors your map in 4 different shades and keeps the randomness. This function is made for higher resolution objects, which need more clarity to the map when making animations.

## **Contributions**
- This Repository does not have the need to be efficient. I tried making my best, but it is a waste of time working on it longer than a few days.
- If you have found a ***BUG***, please let me know, so we can fix that.
  
