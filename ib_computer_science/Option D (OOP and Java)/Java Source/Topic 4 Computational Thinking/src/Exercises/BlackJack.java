package GILBERT;
import java.util.Random;
import javax.swing.*;
public class BlackJack {

	public static void main(String[] args) {
		JFrame frame = new JFrame();
		Object[] hitorstand  = {"Hit","Stand","Leave"};
		int numcap = 10;
		int userinput = 0;
		int comp;
		boolean endcond = false;
		while (endcond = false) {
			int a = JOptionPane.showOptionDialog(frame.getContentPane(), "Welcome to blackjack!\n\nYour cards are:"+"\nFor a total of:"+"\nThe DEALER has "+" cards,\nWhat do you want to do?","Enter a Number",JOptionPane.YES_NO_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE,null,hitorstand, null);

		
	}

}
}