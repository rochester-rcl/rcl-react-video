from io_parser import IOParser
from videoreader import VideoReader
import cv2
import math
import numpy as np

extended_args = [
    {'short': '-r', 'verbose': '--resolution', 'help': 'Resolution of output image - MUST be in format wxh (i.e. 1920x1080)',
     'required': True, 'type': str},
]

def get_slice_size_and_frequency(initial_size, width, duration):
    n_slices = width / initial_size
    frequency = math.floor(duration / n_slices)
    if frequency is 0:
        return get_slice_size_and_frequency(initial_size * 2, width, duration)
    return [initial_size, frequency]

parser = IOParser(add_args=extended_args)
reader = VideoReader(parser.input_file)
output = parser.output_file
width, height = [int(val) for val in parser.resolution.split('x')]
# the duration of the input video in seconds
duration = math.ceil(reader.frames / reader.fps)

slice_size, sample_frequency = get_slice_size_and_frequency(1, width, duration)

n_slices = width / slice_size

# the destination array for our slit scan (
dst = np.zeros((height, width, 3), dtype=np.uint8)

frame_slice_interval = math.ceil(reader.fps * sample_frequency)

current_pixel_pos = 0

slice_count = 0
current_frame = 0

h, w, channels = dst.shape

while slice_count <= n_slices:
    dst_pixel = current_pixel_pos + slice_size
    if dst_pixel > w:
        break
    half_width = int(w / 2)
    half_height = int(height / 2)
    frame = reader.get_frame(current_frame)
    v_center = int(frame.shape[0] / 2)
    slice = frame[v_center-half_height:v_center+half_height, half_width - int(slice_size / 2):half_width - int(slice_size / 2) + slice_size]
    dst[:, current_pixel_pos:dst_pixel] = slice
    current_pixel_pos = dst_pixel
    current_frame += frame_slice_interval
    slice_count += 1
cv2.imwrite(output, dst)
