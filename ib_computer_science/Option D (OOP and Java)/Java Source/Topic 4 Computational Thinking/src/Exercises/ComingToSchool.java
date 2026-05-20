package GILBERT;
import javax.swing.JOptionPane;
public class ComingToSchool {

	public static void main(String[] args) {
		String sbd = JOptionPane.showInputDialog(null, "Enter your birth day:", "Input",JOptionPane.QUESTION_MESSAGE);
		String sbm = JOptionPane.showInputDialog(null, "Enter your birth month:", "Input",JOptionPane.QUESTION_MESSAGE);
		String sby = JOptionPane.showInputDialog(null, "Enter your birth year:", "Input",JOptionPane.QUESTION_MESSAGE);
		String scd = JOptionPane.showInputDialog(null, "Enter current day:", "Input",JOptionPane.QUESTION_MESSAGE);
		String scm = JOptionPane.showInputDialog(null, "Enter current month:", "Input",JOptionPane.QUESTION_MESSAGE);
		String scy = JOptionPane.showInputDialog(null, "Enter current year:", "Input",JOptionPane.QUESTION_MESSAGE);
		int bd = Integer.parseInt(sbd);
		int bm = Integer.parseInt(sbm);
		int by = Integer.parseInt(sby);
		int cd = Integer.parseInt(scd);
		int cm = Integer.parseInt(scm);
		int cy = Integer.parseInt(scy);
		int sm = cm - bm;
		int sy = cy - by -4;
		if (sm < 0)
		{
			sy -= sy;
			sm = -sm;
		}
		int sd = cd - bd;
		if (sd < 0)
		{
			sm -= sm;
		}
		int td = sd + 20*sm +200*sy;
		int th = 6*td;
		int tm = th*60;
		int ts = tm*60;
		JOptionPane.showMessageDialog(null, "The time spent in classes is:\nTotal hours: "+th+"\n\nOr in minutes: "+tm+"\nOr in seconds: "+ts,"Message",JOptionPane.INFORMATION_MESSAGE);
		

	}

}
