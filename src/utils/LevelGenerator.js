export default class LevelGenerator {
  constructor(colors, difficulty) {
    // Get available colors for this level
    this.colors = colors;
    this.difficulty = difficulty;
    this.nextKey = 0;
  }

  getFirstSquare() {
    return this.getSquare(0);
  }

  getNextSquare() {
    const colorIndex = Math.floor(Math.random() * this.colors.length);
    return this.getSquare(colorIndex);
  }

  getSquare(colorIndex) {
    const square = {
      key: this.nextKey,
      color: this.colors[colorIndex],
      timeToNext: Math.floor(Math.random() * 2000 + 800)
    };
    this.nextKey++;
    return square;
  }
}
