package GILBERT;
import javax.swing.JOptionPane;
public class Analogclock {

	public static void main(String[] args) {
		String shour = JOptionPane.showInputDialog(null,"Input the hour","Message",JOptionPane.QUESTION_MESSAGE);
		String sminute = JOptionPane.showInputDialog(null,"Input the minute","Message",JOptionPane.QUESTION_MESSAGE);
		double hour = Double.parseDouble(shour);
		double minute = Double.parseDouble(sminute);
		double hpoint = hour*30+minute*0.5;
		double mpoint = minute*6;
		JOptionPane.showMessageDialog(null, "The hour pointer is at "+hpoint+" the minute pointer is at "+mpoint,"Message",JOptionPane.INFORMATION_MESSAGE);
	}

}
