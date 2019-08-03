


export default class LevelGenerator {
  constructor(colors, bpm) {
    // Get available colors for this level
    this.colors = colors;
    this.speed = ((60 / bpm) / 4 )* 1000;
    this.nextKey = 0;
    this.lastColorIndex = 0;
    this.bpm = bpm;
    this.tickLength = ((60 / bpm))* 1000;
    this.stepsToSquare = null;
  }

  setBPM(bpm) {
    this.bpm = bpm
    this.tickLength = ((60 / bpm)) * 1000;
  }

  play(onTick) {
    this.shouldStop = false

    const fixedInterval = (callback) => {
      const time = {
        start: performance.now(),
        total: this.tickLength
      };
      const tick = now => {
        if (time.total <= now - time.start) {
          time.start = now;                                                                                     
          time.total = this.tickLength;
          if (!this.shouldStop) {
            if(this.stepsToSquare === 0) {
              const {stepsToNextSquare, ...square} = getSquare();
              this.stepsToSquare = stepsToNextSquare;
              callback && callback(square);
            } else {
              this.stepsToSquare && this.stepsToSquare--;
              callback && callback();
            }
          }
        } 
        if (!this.shouldStop) requestAnimationFrame(tick);
      };  
      requestAnimationFrame(tick);
    };

    fixedInterval(onTick);
  }

  startGame() {
    this.stepsToSquare = 0;
  }

  stop() {
    this.shouldStop = true
  }

  getFirstSquare() {
    return this.getSquare(0);
  }

  getNextSquare() {
    const colorIndex = Math.floor(Math.random() * this.colors.length);
    return this.getSquare(colorIndex);
  }

  getNextColorIndex(stepsToNextSquare) {
    const a = stepsToNextSquare - 2;
    const modifier = stepsToNextSquare === 1 ? 0 : Math.floor(a/3) + (a % 3 === 0 ? 0.1 : (a % 3 === 1 ? 0.3 : 0.6))
    const positionsToNextColor = Math.floor(Math.random() + modifier);
    const nextColorIndex = (this.lastColorIndex + positionsToNextColor) % this.colors.length;
    this.lastColorIndex = nextColorIndex;
    return nextColorIndex;
  }

  getSquare() {
    const stepsToNextSquare = Math.floor(Math.random() * 5 + 1)
    const colorIndex = this.getNextColorIndex(stepsToNextSquare);

    const square = {
      key: this.nextKey,
      color: this.colors[colorIndex],
      stepsToNextSquare
    };
    this.nextKey++;
    return square;
  }
}
