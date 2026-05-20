package GILBERT;
import javax.swing.JOptionPane;
public class GroupOfStudents {

	public static void main(String[] args) {
		int count = 0;
		int sum = 0;
		int pass = 0;
		int fail = 0;
		while (count < 20)
		{
			String sscore = JOptionPane.showInputDialog(null,"Enter the student grade","Input",JOptionPane.QUESTION_MESSAGE);
			int score = Integer.parseInt(sscore);
			if (score > 100)
			{
				JOptionPane.showMessageDialog(null, "Input approrpriate number","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else if (score < 0)
			{
				JOptionPane.showMessageDialog(null, "Input approrpriate number","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else if (score > 50)
			{
				pass++;
				count++;
			}
			else;
			{
				fail++;
				count++;
			}

	
		}
		double average = sum/20;
		JOptionPane.showMessageDialog(null, pass+" students passed, and "+fail+"students failed.\nThe average score was "+average,"Message",JOptionPane.INFORMATION_MESSAGE);
	}

}
