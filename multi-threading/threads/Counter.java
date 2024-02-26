public class Counter implements Runnable {

  private int count = 0;

  public void increment() {
    try {
      Thread.sleep(10);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    count += 1;
  }

  public void decrement() {
    count -= 1;
  }

  public int getValue() {
    return count;
  }

  @Override
  public void run() {
    this.increment();
    System.out.println(
      "Value Thread Increment : " + Thread.currentThread().getName() + " | " + this.getValue()
    );

    this.decrement();
    System.out.println(
      "Value Thread Increment : " + Thread.currentThread().getName() + " | " + this.getValue()
    );
  }
}
