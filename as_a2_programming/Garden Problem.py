import math


def calculate_lawn_area(garden_area, patio_length, patio_width, fountain_radius):
    """
    Calculate the area of lawn needed after accounting for the patio and fountain.

    Parameters:
    patio_length (float): Length of the patio in meters.
    patio_width (float): Width of the patio in meters.
    fountain_radius (float): Radius of the fountain in meters.

    Returns:
    float: Area of the lawn needed in square meters.
    """
    # Calculate the area of the patio
    patio_area = patio_length * patio_width

    # Calculate the area of the fountain using the formula for the area of a circle
    fountain_area = math.pi * (fountain_radius ** 2)

    # Total area of lawn is the sum of patio area and fountain area
    total_area = patio_area + fountain_area

    # The lawn area needed is the total area minus the area of the patio and fountain
    lawn_area_needed = garden_area - total_area

    return lawn_area_needed

def main():

    # Prompt user for garden dimensions
    garden_length = float(input("Enter the length of the garden: "))
    garden_width = float(input("Enter the width of the garden: "))

    garden_area = garden_length * garden_width

    # Prompt user for patio dimensions
    patio_length = float(input("Enter the length of the patio (in meters): "))
    patio_width = float(input("Enter the width of the patio (in meters): "))

    # Define the radius of the fountain
    fountain_radius = 1.2  # Radius of the fountain in meters

    # Call the function to calculate lawn area needed
    lawn_area = calculate_lawn_area(garden_area, patio_length, patio_width, fountain_radius)

    # Output the result
    print(f"\nTotal area of lawn needed (including patio and fountain): {lawn_area:.2f} square meters")

# Run the program
if __name__ == "__main__":
    main()