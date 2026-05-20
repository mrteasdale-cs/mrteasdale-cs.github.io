package GILBERT;
import javax.swing.JOptionPane;
public class ComputerFixEmShop {

	public static void main(String[] args) {
		String beeping = JOptionPane.showInputDialog(null,"Does your computer beep on startup?(Y/N)","Input",JOptionPane.QUESTION_MESSAGE);
		String drivespin = JOptionPane.showInputDialog(null,"Does your hard drive spin?(Y/N)","Input",JOptionPane.QUESTION_MESSAGE);
		if (beeping.equals("Y"))
		{
			if (drivespin.equals("Y"))
			{
				JOptionPane.showMessageDialog(null, "Hold for more one of our technicians", "Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else
			{
				JOptionPane.showMessageDialog(null, "Check drive contacts", "Message",JOptionPane.INFORMATION_MESSAGE);
			}
		}
		else
		{
			if (drivespin.equals("Y"))
			{
				JOptionPane.showMessageDialog(null, "Bring the computer in for repair", "Message",JOptionPane.INFORMATION_MESSAGE);	
			}
			else
			{
				JOptionPane.showMessageDialog(null, "Check the speaker contacts", "Message",JOptionPane.INFORMATION_MESSAGE);		
			}
		}
	}

}
