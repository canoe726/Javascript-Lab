class Bank implements Runnable {

  private int money = 0;

  public void deposit(int amount) {}

  public void withdraw() {}

  @Override
  public void run() {}
}

public class RaceCondition {

  public static void main(String args[]) {
    Bank counter = new Bank();
  }
}
