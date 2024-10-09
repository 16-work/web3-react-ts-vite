// 这里不要import任何东西

self.onmessage = function (e: MessageEvent) {
  const { start, end } = e.data;

  let intervalId = setInterval(() => {
    const now = Date.now();
    let milliseconds: number;
    let status: 'Upcoming' | 'Live' | 'Ended';

    if (now < start) {
      milliseconds = start - now;
      status = 'Upcoming';
    } else if (now >= start && now <= end) {
      milliseconds = end - now;
      status = 'Live';
    } else {
      milliseconds = 0;
      status = 'Ended';
      clearInterval(intervalId);
    }

    self.postMessage({ status, milliseconds });
  }, 100);
};
