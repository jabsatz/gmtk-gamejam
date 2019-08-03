export default class LevelGenerator {
  constructor(colors, bpm) {
    // Get available colors for this level
    this.colors = colors;
    this.bpm = bpm;
    this.speed = (60 / bpm) * 1000;
    this.nextKey = 0;
    this.lastColorIndex = 0;
  }

  getFirstSquare() {
    return this.getSquare(0);
  }

  getNextSquare() {
    const colorIndex = Math.floor(Math.random() * this.colors.length);
    return this.getSquare(colorIndex);
  }

  getNextColorIndex(stepsToNextSquare) {
    const maxPositionsToMove = Math.min(stepsToNextSquare, this.colors.length - 1);
    const positionsToNextColor = Math.floor(Math.random() * maxPositionsToMove);
    const nextColorIndex = (this.lastColorIndex + positionsToNextColor) % this.colors.length;
    this.lastColorIndex = nextColorIndex;
    return nextColorIndex;
  }

  getSquare() {
    const stepsToNextSquare = Math.floor(Math.random() * 4 + 1)
    const colorIndex = this.getNextColorIndex(stepsToNextSquare);

    const square = {
      key: this.nextKey,
      color: this.colors[colorIndex],
      timeToNext: stepsToNextSquare * this.speed
    };
    this.nextKey++;
    return square;
  }
}
