public class ThreadExample extends Thread {

  public static int amount = 0;

  public static void main(String[] args) {
    ThreadExample thread = new ThreadExample();
    thread.start();

    while (thread.isAlive()) {
      System.out.println("Waiting ...");
    }

    System.out.printf("amount : %d\n", amount);
    amount += 1;
    System.out.printf("amount : %d\n", amount);
  }

  @Override
  public void run() {
    amount += 1;
  }
}
