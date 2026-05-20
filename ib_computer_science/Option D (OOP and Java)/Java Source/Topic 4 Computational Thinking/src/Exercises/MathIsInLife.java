package GILBERT;
import javax.swing.JOptionPane;
public class MathIsInLife {

	public static void main(String[] args) {
		String sa = JOptionPane.showInputDialog(null, "Enter the variable A", "Input", JOptionPane.QUESTION_MESSAGE);
		String sb = JOptionPane.showInputDialog(null, "Enter the variable B", "Input", JOptionPane.QUESTION_MESSAGE);
		String sc = JOptionPane.showInputDialog(null, "Enter the variable C", "Input", JOptionPane.QUESTION_MESSAGE);
		double a = Double.parseDouble(sa);
		double b = Double.parseDouble(sb);
		double c = Double.parseDouble(sc);
		double determinant = b*b-4*a*c;
		if (determinant > 0)
		{
			double r1 = (-b + Math.sqrt(determinant)) / (2 * a);
			double r2 = (-b - Math.sqrt(determinant)) / (2 * a);
			JOptionPane.showMessageDialog(null, "For the values:\na = "+a+"\nb = "+b+"\nc ="+c+"\nThe positive root is: "+r1+"\nThe negative root is: "+r2, "Message", JOptionPane.INFORMATION_MESSAGE);
		}
		else if (determinant == 0)
		{
			double r = (-b + Math.sqrt(determinant)) / (2 * a);
			JOptionPane.showMessageDialog(null, "The only root for this equation is "+r, "Message", JOptionPane.INFORMATION_MESSAGE);
		}
		else
		{
			JOptionPane.showMessageDialog(null, "The equation cannot be solved", "Message", JOptionPane.INFORMATION_MESSAGE);
		}
	}

}
