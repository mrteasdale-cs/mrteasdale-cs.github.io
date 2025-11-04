#program to calculate the area of a rectangle

def volume_of_rectangle(length, height, width):
    #take inputs and calc volume
    volume = height * width * length
    return  volume


vol1 = volume_of_rectangle(50, 10, 6)
vol2 = volume_of_rectangle(5, 9, 2)
vol3 = volume_of_rectangle(5, 10, 6)

print(vol1, vol2, vol3)