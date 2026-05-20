package GILBERT;
import javax.swing.JOptionPane;
public class LarrysBurgers {

	public static void main(String[] args) {
		JOptionPane.showMessageDialog(null, "Welcome to the Larry's Burger's program", "Message", JOptionPane.INFORMATION_MESSAGE);
		String shamburgers = JOptionPane.showInputDialog(null,"Enter the number of hamburgers ordered:","Input",JOptionPane.QUESTION_MESSAGE);
		String sfries = JOptionPane.showInputDialog(null,"Enter the number of fries ordered:","Input",JOptionPane.QUESTION_MESSAGE);
		String ssodas = JOptionPane.showInputDialog(null,"Enter the number of sodas ordered:","Input",JOptionPane.QUESTION_MESSAGE);
		String scashtend = JOptionPane.showInputDialog(null,"Enter the cash tendered:","Input",JOptionPane.QUESTION_MESSAGE);
		double hamburgers = Double.parseDouble(shamburgers);
		double fries = Double.parseDouble(sfries);
		double sodas = Double.parseDouble(ssodas);
		double cashtend = Double.parseDouble(scashtend);
		double cost = hamburgers*1.49+fries*0.89+sodas*0.99;
		double subtotoal = cost*1.13;
		JOptionPane.showMessageDialog(null, "Your order is:\nHamburgers: "+hamburgers+"\nFries: "+fries+"\nSodas: "+sodas+"\nCash tendered: "+cost+"\nSubtotal:"+subtotoal+"\nTotal: "+cashtend+"\nChange: "+(cashtend-subtotoal),"Message",JOptionPane.INFORMATION_MESSAGE);
		JOptionPane.showMessageDialog(null, "Thank you for using this program","Message",JOptionPane.INFORMATION_MESSAGE);
	}

}
