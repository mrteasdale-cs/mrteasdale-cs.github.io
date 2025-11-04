import java.text.*;

public class CramerEquation {

    public CramerEquation() {}

    public static void main(String[] args) {

        System.out.println("Solve the following system of equations using Cramer’s rule:");
        System.out.println("3.4x + 50.2y = 44.5");
        System.out.println("2.1x + .55y = 5.9");

        DecimalFormat df = new DecimalFormat("#.###");

        double D1x = 3.4;
        double D1y = 50.2;
        double D2x = 2.1;
        double D2y = 0.55;

        double B1 = 44.5;
        double B2 = 5.9;

        double A = (D1x * D2y) - (D1y * D2x);
        double A1 = (B1 * D2y) - (D1y * B2);
        double A2 = (D1x * B2) - (B1 * D2x);

        double x = A1 / A;
        double y = A2 / A;
        System.out.println("x = " + df.format(x));
        System.out.println("y = " + df.format(y));

    }
}