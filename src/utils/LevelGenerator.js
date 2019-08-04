export default class LevelGenerator {
  constructor(colors, bpm, barColorIndex) {
    // Get available colors for this level
    this.colors = colors;
    this.speed = (60 / bpm / 4) * 1000;
    this.nextKey = 0;
    this.lastColorIndex = 0;
    this.bpm = bpm;
    this.tickLength = (60 / bpm) * 1000;
    this.sendNewSquares = false;
    this.stepsToNextSquare = 0;
    this.squares = [];
    this.barColorIndex = barColorIndex;
  }

  setBarColorIndex(barColorIndex) {
    this.barColorIndex = barColorIndex;
  }

  setBPM(bpm) {
    this.bpm = bpm;
    this.tickLength = (60 / bpm) * 1000;
  }

  play(onTick) {
    this.shouldStop = false;

    const fixedInterval = callback => {
      const time = {
        start: performance.now(),
        total: this.tickLength
      };
      const tick = now => {
        if (time.total <= now - time.start) {
          time.start = now;
          time.total = this.tickLength;
          if (!this.shouldStop) {
            this.update(callback);
          }
        }
        if (!this.shouldStop) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    fixedInterval(onTick);
  }

  startGame() {
    this.sendNewSquares = true;
  }

  stop() {
    this.shouldStop = true;
  }

  // All the update logic of each tick of the game goes here.
  update(sendUpdateData) {
    const updates = {};
    if (this.sendNewSquares === true) {
      if (this.stepsToNextSquare === 0) {
        const { stepsToNextSquare, ...square } = this.getSquare();
        this.stepsToNextSquare = stepsToNextSquare;
        this.squares.push(square);
        updates.square = square;
      } else {
        this.stepsToNextSquare && this.stepsToNextSquare--;
      }
    }
    this.squares.forEach(square => {
      square.stepsToCollision--;
      if (square.stepsToCollision === 0) {
        updates.collision = {
          ...square,
          match: square.color === this.colors[this.barColorIndex]
        };
      }
    });
    this.squares = this.squares.filter(s => s.stepsToCollision !== 0);
    sendUpdateData && sendUpdateData(updates);
  }

  getNextColorIndex(stepsToNextSquare) {
    const a = stepsToNextSquare - 2;
    const modifier =
      stepsToNextSquare === 1
        ? 0
        : Math.floor(a / 3) + (a % 3 === 0 ? 0.1 : a % 3 === 1 ? 0.3 : 0.6);
    const positionsToNextColor = Math.floor(Math.random() + modifier);
    const nextColorIndex =
      (this.lastColorIndex + positionsToNextColor) % this.colors.length;
    this.lastColorIndex = nextColorIndex;
    return nextColorIndex;
  }

  getSquare() {
    const stepsToNextSquare = Math.floor(Math.random() * 5 + 1);
    const colorIndex = this.getNextColorIndex(stepsToNextSquare);

    const square = {
      key: this.nextKey,
      color: this.colors[colorIndex],
      stepsToNextSquare,
      stepsToCollision: 4
    };
    this.nextKey++;
    return square;
  }
}
