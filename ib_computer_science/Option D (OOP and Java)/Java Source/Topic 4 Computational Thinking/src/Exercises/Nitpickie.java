package GILBERT;
import javax.swing.JOptionPane;
public class Nitpickie {

	public static void main(String[] args) {
		String swei = JOptionPane.showInputDialog(null,"Enter the weight of the package in kilograms:","Input",JOptionPane.QUESTION_MESSAGE);
		String sl = JOptionPane.showInputDialog(null,"Enter the leng of the package in meters:","Input",JOptionPane.QUESTION_MESSAGE);
		String swid = JOptionPane.showInputDialog(null,"Enter the width of the package in meters:","Input",JOptionPane.QUESTION_MESSAGE);
		double wei = Double.parseDouble(swei);
		double l = Double.parseDouble(sl);
		double wid = Double.parseDouble(swid);
		double cube = l*wid;
		if (wei>27)
		{
			if (cube > 0.1)
			{
				JOptionPane.showMessageDialog(null, "Package rejected\nToo heavy and too large","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else
			{
				JOptionPane.showMessageDialog(null, "Package rejected\nToo large","Message",JOptionPane.INFORMATION_MESSAGE);
			}
		}
		else if (cube > 0.1)
		{
			JOptionPane.showMessageDialog(null, "Package rejected\nToo large");
		}
		else
		{
			JOptionPane.showMessageDialog(null, "Package accepted","Message",JOptionPane.INFORMATION_MESSAGE);
		}
		
	}

}
