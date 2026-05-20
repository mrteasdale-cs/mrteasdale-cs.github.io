package GILBERT;
import javax.swing.JOptionPane;
public class TwoAirPorts {

	public static void main(String[] args) {
		String sr = JOptionPane.showInputDialog(null, "Enter radius:", "Message",JOptionPane.QUESTION_MESSAGE);
		String sIATA = JOptionPane.showInputDialog(null, "Enter starting airport IATA code:", "Message",JOptionPane.QUESTION_MESSAGE);
		String sA1 = JOptionPane.showInputDialog(null, "Enter starting airport lattitude:", "Message",JOptionPane.QUESTION_MESSAGE);
		String sB1 = JOptionPane.showInputDialog(null, "Enter starting airport longtitude:", "Message",JOptionPane.QUESTION_MESSAGE);
		String eIATA = JOptionPane.showInputDialog(null, "Enter ending airport IATA code:", "Message",JOptionPane.QUESTION_MESSAGE);
		String sA2 = JOptionPane.showInputDialog(null, "Enter ending airport lattitude:", "Message",JOptionPane.QUESTION_MESSAGE);
		String sB2 = JOptionPane.showInputDialog(null, "Enter ending airport longtitude:", "Message",JOptionPane.QUESTION_MESSAGE);
		double A1 = Double.parseDouble(sA1);
		double B1 = Double.parseDouble(sB1);
		double A2 = Double.parseDouble(sA2);
		double B2 = Double.parseDouble(sB2);
		double r = Double.parseDouble(sr);
		double d = r*Math.acos(Math.sin(A2)*Math.sin(A1)+Math.cos(A2)*Math.cos(A1)*Math.cos(B2-B1));	
		JOptionPane.showMessageDialog(null, "The distance from "+sIATA+" to "+eIATA+" is "+d);
	}

}
