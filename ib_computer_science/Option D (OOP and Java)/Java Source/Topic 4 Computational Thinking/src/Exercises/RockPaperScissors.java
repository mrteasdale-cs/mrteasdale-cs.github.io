package GILBERT;
import javax.swing.JOptionPane;
import java.util.Random;
public class RockPaperScissors {

	public static void main(String[] args) {
		Random rand = new Random();
		String personinput = JOptionPane.showInputDialog(null,"Input your chocie\nRock(R), Paper(P), or Scissors(S)","Input",JOptionPane.QUESTION_MESSAGE);
		int counterbound = 3;
		int computer = rand.nextInt(counterbound);
		String compinput = null;
		switch (computer)
		{
		case 1:
			compinput = "R";
			break;
		case 2:
			compinput = "P";
			break;
		case 3:
			compinput = "S";
			break;
		}
		switch (personinput)
		{
		case "R":
			if (compinput.equals("R"))
			{
				JOptionPane.showMessageDialog(null, "That is a draw","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else if (compinput.equals("P"))
			{
				JOptionPane.showMessageDialog(null, "You lost","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else
			{
				JOptionPane.showMessageDialog(null, "You won","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			break;
		case "P":
			if (compinput.equals("R"))
			{
				JOptionPane.showMessageDialog(null, "You won","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else if (compinput.equals("P"))
			{
				JOptionPane.showMessageDialog(null, "That is a draw","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else
			{
				JOptionPane.showMessageDialog(null, "You lost","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			break;
		case "S":
			if (compinput.equals("R"))
			{
				JOptionPane.showMessageDialog(null, "You lost","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else if (compinput.equals("P"))
			{
				JOptionPane.showMessageDialog(null, "You won","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			else
			{
				JOptionPane.showMessageDialog(null, "That is a draw","Message",JOptionPane.INFORMATION_MESSAGE);
			}
			break;
		}

	}

}
