package GILBERT;
import javax.swing.JOptionPane;
import java.util.Random;
public class BettingDice {

	public static void main(String[] args) {
		Random rand = new Random();
		int dicebound = 6;
		int int_random;
		int rew = 0;
		int val6 = 0;
		int val1 = 0;
		int val2 = 0;
		int val3 = 0;
		int val4 = 0;
		int val5 = 0;
		for (int i=0;i<3;i++)
		{
			int_random = rand.nextInt(dicebound);
			if (int_random == 6)
			{
				val6++;
			}
			else if (int_random == 5)
			{
				val5++;
			}
			else if (int_random == 4)
			{
				val4++;
			}
			else if (int_random == 3)
			{
				val3++;
			}
			else if (int_random == 2)
			{
				val2++;
			}
			else if (int_random == 1)
			{
				val1++;
			}
		}
		if (val6 == 3)
		{
			rew = 20;
		}
		else if (val5 == 3)
		{
			rew = 10;
		}
		else if (val4 == 3)
		{
			rew = 10;
		}
		else if (val3 == 3)
		{
			rew = 10;
		}
		else if (val2 == 3)
		{
			rew = 10;
		}
		else if (val1 == 3)
		{
			rew = 10;
		}
		else if (val5 == 2)
		{
			rew = 5;
		}
		else if (val4 == 2)
		{
			rew = 5;
		}
		else if (val3 == 2)
		{
			rew = 5;
		}
		else if (val2 == 2)
		{
			rew = 5;
		}
		else if (val1 == 2)
		{
			rew = 5;
		}
		else
		{
			rew = 0;
		}
		if (rew > 1)
		{
			JOptionPane.showMessageDialog(null, "You won "+rew+" dollars, congratulation","Message",JOptionPane.INFORMATION_MESSAGE);
		}
		else
		{
			JOptionPane.showMessageDialog(null, "You lost your bet","Message",JOptionPane.INFORMATION_MESSAGE);
		}
	}

}
