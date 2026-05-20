package GILBERT;
import javax.swing.JOptionPane;
public class Humidex {
	public static void main(String[] args) {
		String sdpoint = JOptionPane.showInputDialog(null,"Enter the Dew Point(D)","Input",JOptionPane.QUESTION_MESSAGE);
		String sairtemp = JOptionPane.showInputDialog(null,"Enter the air temperature(T)","Input",JOptionPane.QUESTION_MESSAGE);
		double dpoint = Double.parseDouble(sdpoint);
		double airtemp = Double.parseDouble(sairtemp);
		double epow = 5147.7530*((1/273.16)-(1/(273.16-dpoint)));
		double bR = Math.pow(2.7183, epow);
		double R = 6.11*bR;
		double H = 0.55555*(R-10);
		double humidex=H+airtemp;
		JOptionPane.showMessageDialog(null, "The humidex is "+humidex,"Message",JOptionPane.INFORMATION_MESSAGE);
	}

}
