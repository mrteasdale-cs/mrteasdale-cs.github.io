package GILBERT;
import javax.swing.JOptionPane;
public class MrTHoliday {

	public static void main(String[] args) {
		String syear = JOptionPane.showInputDialog(null, "Enter a year:", "Input", JOptionPane.QUESTION_MESSAGE);
		int year = Integer.parseInt(syear);
		if (year%4==0)
		{
			if (year%100==0)
			{
				JOptionPane.showMessageDialog(null, year+" is not a leap year","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else
			{
				JOptionPane.showMessageDialog(null, year+" is a leap year","Message",JOptionPane.INFORMATION_MESSAGE);	
			}
		}
		else
		{
			JOptionPane.showMessageDialog(null, year+" is not a leap year","Message",JOptionPane.INFORMATION_MESSAGE);
		}
	}

}
