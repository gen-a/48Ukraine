/**
 * Swipe event detect by incoming pointer events
 * @param swipeDistance
 * @param swipeTime
 * @constructor
 */
const SwipeDetect = function SwipeDetect(swipeDistance = 30, swipeTime = 300) {
  this.timer = 0;
  this.swipeDistance = swipeDistance;
  this.swipeTime = swipeTime;
  this.data = {};
  this.startPoint = [];
  this.endPoint = [];
};
SwipeDetect.prototype = {
  onSwipe(e) {
    console.group('SwipeDetect message');
    console.error('onSwipe callback not defined...');
    console.dir(e);
    console.groupEnd();
  },
  start(x, y) {
    this.startPoint = [x, y];
    this.endPoint = [x, y];
    this.timer = new Date().getTime();
  },
  move(x, y) {
    this.endPoint = [x, y];
  },
  end(e) {
    const { startPoint, endPoint, timer, swipeDistance, swipeTime } = this;
    const time = new Date().getTime() - timer;
    const xDistance = endPoint[0] - startPoint[0];
    const yDistance = endPoint[1] - startPoint[1];
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    const speed = distance / time;
    const detectSwipeDirection = (x, y) => {
      if (Math.abs(x) > Math.abs(y)) {
        return x > 0 ? 'right' : 'left';
      }
      return y > 0 ? 'down' : 'up';
    };

    if (distance > swipeDistance && swipeTime > time) {
      const direction = detectSwipeDirection(xDistance, yDistance);
      this.onSwipe({
        direction, xDistance, yDistance, distance, time, speed
      });
      e.preventDefault();
      window.getSelection().removeAllRanges();
    }
  }
};

export default SwipeDetect;