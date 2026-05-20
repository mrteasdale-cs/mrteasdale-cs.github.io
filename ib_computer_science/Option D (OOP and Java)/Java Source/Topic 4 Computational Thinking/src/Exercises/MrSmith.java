/**
 * Calculator of circle's circumference & area
**/
package GILBERT;
import javax.swing.JOptionPane;
public class MrSmith {

	public static void main(String[] args) {
		JOptionPane.showMessageDialog(null, "Welcome to the CRAP Radio program", "Message", JOptionPane.INFORMATION_MESSAGE); //Welcoming message
		String sradius = JOptionPane.showInputDialog(null, "Enter the radius of the circle", "Input", JOptionPane.QUESTION_MESSAGE); //input radius
		double radius = Double.parseDouble(sradius);
		double circumference = (radius*2)*3.14;
		double area = radius*radius*3.14;
		double volume = radius*radius*radius*3.14*4/3;
		JOptionPane.showMessageDialog(null, "The circumference of the circle is: "+circumference+"\nThe area of the circle is: "+area+"\nThe volume of the circle is: "+volume, "Message", JOptionPane.INFORMATION_MESSAGE);
		JOptionPane.showMessageDialog(null, "Thank you for using C-RAP Radio", "Message", JOptionPane.INFORMATION_MESSAGE);
	}

}
