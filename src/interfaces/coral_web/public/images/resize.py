# read in image and resize to 16x16 and 32x32

import cv2
import os

image = cv2.imread('./tinygrid_logo_clear.png')

# resize image to 16x16
resized = cv2.resize(image, (16, 16), interpolation = cv2.INTER_AREA)
cv2.imwrite('favicon-16x16.png', resized)

# resize image to 32x32
resized = cv2.resize(image, (32, 32), interpolation = cv2.INTER_AREA)
cv2.imwrite('favicon-32x32.png', resized)

# resize to 512x512 and make everywhere where there is alpha channel not 100% transparent white
resized = cv2.resize(image, (512, 512), interpolation = cv2.INTER_AREA)
cv2.imwrite('mushroom-filled-icon-512x512.png', resized)
