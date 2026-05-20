package GILBERT;
import javax.swing.JOptionPane;
public class CRAPIntern {

	public static void main(String[] args) {
		JOptionPane.showMessageDialog(null, "Welcome to the CRAP Radio program", "Message", JOptionPane.INFORMATION_MESSAGE); //Welcoming message
		String scelcius = JOptionPane.showInputDialog (null, "Enter Temperature in Ceclius", "Input", JOptionPane.QUESTION_MESSAGE); //Temperature in celcius input
		double celcius = Integer.parseInt(scelcius); //parsing
		double farenheit = (celcius*1.8)+32; //calculation of farenheit
		JOptionPane.showMessageDialog(null, "The temperature in Farenheit is "+farenheit+", and the temperature in Celcius is "+celcius, "Messege", JOptionPane.INFORMATION_MESSAGE); //actual output
		JOptionPane.showMessageDialog(null, "Thank you for using the CRAP radio program.", "Messege", JOptionPane.INFORMATION_MESSAGE); //thank you message

	}
	
}
