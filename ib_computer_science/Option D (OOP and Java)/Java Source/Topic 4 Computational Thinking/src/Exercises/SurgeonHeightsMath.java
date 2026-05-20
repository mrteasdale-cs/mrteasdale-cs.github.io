package GILBERT;
import javax.swing.JOptionPane;
public class SurgeonHeightsMath {

	public static void main(String[] args) {
		String snum1 = JOptionPane.showInputDialog(null, "Enter the first 3 digit number","Input",JOptionPane.QUESTION_MESSAGE);
		String snum2 = JOptionPane.showInputDialog(null, "Enter the second 3 digit number","Input",JOptionPane.QUESTION_MESSAGE);
		String cfn2 = snum2.substring(0, 1);
		String csn2 = snum2.substring(1, 2);
		String ctn2 = snum2.substring(2, 3);
		int num1 = Integer.parseInt(snum1);
		int num2 = Integer.parseInt(snum2);
		int fn2 = Integer.parseInt(cfn2);
		int sn2 = Integer.parseInt(csn2);
		int tn2 = Integer.parseInt(ctn2);
		int fout = tn2*num1;
		int sout = sn2*num1*10;
		int tout = fn2*num1*100;
		int lout = num1*num2;
		int Q = num1/num2;
		System.out.println("Multiplication:\n\n	"+"    "+num1+"\n	"+"X   "+num2+"\n	------\n	"+fout+"\n	"+sout+"\n	"+tout+"\n	-----\n	"+lout+"\nDivision:\n	Q:  "+Q);
	}

}
