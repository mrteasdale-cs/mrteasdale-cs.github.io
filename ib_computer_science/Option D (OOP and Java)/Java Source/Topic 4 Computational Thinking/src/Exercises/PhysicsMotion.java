package GILBERT;
import javax.swing.JOptionPane;
public class PhysicsMotion {

	public static void main(String[] args) {
		String sv = JOptionPane.showInputDialog(null, "Enter intial velocity (m/s):", "Input", JOptionPane.QUESTION_MESSAGE);
		String sa = JOptionPane.showInputDialog(null, "Enter acceleration (m/s^2):", "Input", JOptionPane.QUESTION_MESSAGE);
		String sd = JOptionPane.showInputDialog(null, "Enter distance (m):", "Input", JOptionPane.QUESTION_MESSAGE);
		double v = Double.parseDouble(sv);
		double a = Double.parseDouble(sa);
		double d = Double.parseDouble(sd);
		double squ = (v*2)-(2*a)*d;
		double u = Math.sqrt(squ);
		JOptionPane.showMessageDialog(null, "The final velocity is "+u,"Message",JOptionPane.INFORMATION_MESSAGE);
	}

}
