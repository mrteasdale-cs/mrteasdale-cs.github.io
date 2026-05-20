package GILBERT;
import javax.swing.JOptionPane;
public class WindChill {

	public static void main(String[] args) {
		String scel = JOptionPane.showInputDialog(null,"Enter temperature in celcius","Input",JOptionPane.QUESTION_MESSAGE);
		double cel = Double.parseDouble(scel);
		double frn = (cel*9)/5+32;
		if (frn<10)
		{
			JOptionPane.showMessageDialog(null, "The wind chill is not unpleasant for "+frn+" degrees farenheit","Message",JOptionPane.QUESTION_MESSAGE);
		}
		else if (frn>-10)
		{
			JOptionPane.showMessageDialog(null, "The wind chill is unpleasant for "+frn+" degrees farenheit","Message",JOptionPane.QUESTION_MESSAGE);
		}
		else if (frn>-30)
		{
			JOptionPane.showMessageDialog(null, "The wind chill possibly can cause frostbite for "+frn+" degrees farenheit","Message",JOptionPane.QUESTION_MESSAGE);
		}
		else if (frn>-70)
		{
			JOptionPane.showMessageDialog(null, "The wind chill can likely cause frostbite for "+frn+" degrees farenheit","Message",JOptionPane.QUESTION_MESSAGE);
		}
		else
		{
			JOptionPane.showMessageDialog(null, "Exposed flesh will freeze within half a minute for "+frn+" degrees farenheit","Message",JOptionPane.QUESTION_MESSAGE);
		}
	}

}
