import java.util.Random;

public class Main {

    public static void main(String[] args) {
        System.out.println("Data Structure and Algorithms!");

        // Bubble sort
        System.out.println("Bubble Sort");
        BubbleSort bubble = new BubbleSort();
        int[] arr = createArray(30);
        System.out.println("Unsorted:");
        printArray(arr);
        bubble.sortArray(arr);
        System.out.println("Sorted:");
        printArray(arr);

        // Selection Sort
        System.out.println("\n\nSelection Sort");
        SelectionSort selectionsort = new SelectionSort();
        int[] arr2 = createArray(10);
        System.out.println("Unsorted:");
        printArray(arr2);
        selectionsort.sortArray(arr2);
        System.out.println("Sorted:");
        printArray(arr2);

        //Merge Sort
        System.out.println("\n\nMerge Sort");
        MergeSort mergesort = new MergeSort();
        int[] arr3 = createArray(10);
        System.out.println("Unsorted:");
        printArray(arr3);
        mergesort.sort(arr3);
        System.out.println("Sorted:");
        printArray(arr3);
    }

    /**
     *
     * @param numElements - accepts the number of elements to create an int array
     * @return returns the elements array with random numbers
     */
    public static int[] createArray(int numElements) {

        Random rand = new Random();
        int[] elements = new int[numElements];

        for (int i = 0; i < elements.length; i++) {
            elements[i] = rand.nextInt(100);
        }
        return elements;
    }

    /**
     *
     * @param elementsArr - takes an int array of elements
     *                 no return - prints out array
     */

    public static void printArray(int[] elementsArr) {
        for (int i = 0; i < elementsArr.length; i++){
            System.out.print(elementsArr[i] + " ");
        }
        System.out.print("\n");
    }

}