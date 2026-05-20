package GILBERT;
import javax.swing.JOptionPane;
public class SocialInsuranceNumber {

	public static void main(String[] args) {
		String ssin = JOptionPane.showInputDialog(null,"Enter SIN number:","Input",JOptionPane.QUESTION_MESSAGE);
		int sin = Integer.parseInt(ssin);
		String sfir = ssin.substring(0,1);
		String ssec = ssin.substring(1,2);
		String stri = ssin.substring(2,3);
		String sfou = ssin.substring(3,4);
		String sfiv = ssin.substring(4,5);
		String ssix = ssin.substring(5,6);
		String ssev = ssin.substring(6,7);
		String seig = ssin.substring(7,8);
		String snin = ssin.substring(8,9);
		int fir = Integer.parseInt(sfir);
		int sec = Integer.parseInt(ssec);
		int tri = Integer.parseInt(stri);
		int fou = Integer.parseInt(sfou);
		int fiv = Integer.parseInt(sfiv);
		int six = Integer.parseInt(ssix);
		int sev = Integer.parseInt(ssev);
		int eig = Integer.parseInt(seig);
		int nin = Integer.parseInt(snin);
		int s1 = sec*2+fou*2+six*2+eig*2;
		int s2 = fir+tri+fiv+sev+nin;
		int s3 = s1+s2;
		if (s3%10==0)
		{
			JOptionPane.showMessageDialog(null, "Your SIN number is valid","Message",JOptionPane.INFORMATION_MESSAGE);
		}
		else
		{
			JOptionPane.showMessageDialog(null, "Your SIN number is invalid","Message",JOptionPane.INFORMATION_MESSAGE);
		}
	}

}
