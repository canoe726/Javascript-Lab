import time
from threading import Thread

def thread_first():
    print('the first thread starts')
    for i in range(5):
        print(f"thread_1 is running {i}")
        time.sleep(0.1)
    print("the first thread ends")


def thread_second():
    print('the second thread starts')
    for i in range(5):
        print(f"thread_2 is running {i}")
        time.sleep(0.1)
    print("the second thread ends")


def thread_third():
    for i in range(5):
        print(f"thread_3 is running {i}")
        time.sleep(0.1)
    print("the third thread ends")


class Timer():
    def __init__(self):
        self.start_time = time.time()
        self.end_time = None
    
    def end(self):
        self.end_time = time.time()
        print(f"time spent {self.end_time - self.start_time}")

timer = Timer()

thread_1 = Thread(target = thread_first())
thread_2 = Thread(target = thread_second())
thread_3 = Thread(target = thread_third())

thread_1.start()
thread_2.start()
thread_3.start()

timer.end()
