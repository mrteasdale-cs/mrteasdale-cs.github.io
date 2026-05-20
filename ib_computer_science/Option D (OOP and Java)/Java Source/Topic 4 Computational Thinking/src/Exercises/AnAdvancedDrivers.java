package GILBERT;
import javax.swing.JOptionPane;

public class AnAdvancedDrivers {
	
	public static void main(String[] args) {
		
		
		JOptionPane.showMessageDialog(null, "Welcome to the Stargeion heights advanced driver's education ", "Message", JOptionPane.INFORMATION_MESSAGE);
		String sseconds = JOptionPane.showInputDialog(null, "Please enter the total time (In seconds)", "Input", JOptionPane.QUESTION_MESSAGE);
		int seconds = Integer.parseInt(sseconds);
		int minutes = seconds/60;
		int lseconds = seconds%60;
		int hours = minutes/60;
		int lminutes = hours%60;
		if (hours > 0)
		{
			System.out.println("For the total time of "+sseconds+" seconds, the breakdown is;\nHours: "+hours+"\nMinutes: "+lminutes+"\nSeconds: "+lseconds);	
		}
		else
		{
			System.out.println("For the total time of "+sseconds+" seconds, the breakdown is;\nHours: "+hours+"\nMinutes: "+minutes+"\nSeconds: "+lseconds);
		}
		JOptionPane.showMessageDialog(null, "Thank you for using stargeon heights drivers education program", "Message", JOptionPane.INFORMATION_MESSAGE);
	}

}
