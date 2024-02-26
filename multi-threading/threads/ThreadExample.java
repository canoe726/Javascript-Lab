public class ThreadExample extends Thread {

  public static int amount = 0;

  public static void main(String[] args) throws InterruptedException {
    ThreadExample thread = new ThreadExample();
    thread.start();

    System.out.println("Waiting ...");
    thread.join();

    System.out.printf("amount : %d\n", amount);
    amount += 1;
    System.out.printf("amount : %d\n", amount);
  }

  @Override
  public void run() {
    amount += 1;
  }
}
