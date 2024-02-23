public class RaceCondition {

  public static void main(String[] args) {
    Counter counter1 = new Counter();
    Counter counter2 = new Counter();
    Counter counter3 = new Counter();

    Thread t1 = new Thread(counter1, "Thread-1");
    Thread t2 = new Thread(counter2, "Thread-2");
    Thread t3 = new Thread(counter3, "Thread-3");

    t1.start();
    t2.start();
    t3.start();
  }
}
