'use strict';

class CanvasRenderer {
  constructor(canvas, width, height, cellSize) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.width = +width;
    this.height = +height;
    this.lastRenderedData = [];
    this.setCellSize(cellSize);
    this.lastDraw = 0;
    this.draws = 0;

    this.fgColor = '#0f0';
    this.bgColor = 'transparent';
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);
  }

  render(display) {
    this.clear();
    this.lastRenderedData = display;
    let i, x, y;
    for (i = 0; i < display.length; i++) {
      x = (i % this.width) * this.cellSize;
      y = Math.floor(i / this.width) * this.cellSize;

      this.ctx.fillStyle = [this.bgColor, this.fgColor][display[i]];
      this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
    }
    this.draws++;
  }

  setCellSize(cellSize) {
    this.cellSize = +cellSize;

    this.canvas.width = cellSize * this.width;
    this.canvas.height = cellSize * this.height;

    this.render(this.lastRenderedData);
  }

  getFps() {
    const fps = this.draws / (+new Date() - this.lastDraw) * 1000;
    if (fps === Infinity) {
      return 0;
    }
    this.draws = 0;
    this.lastDraw = +new Date();
    return fps;
  }
}

export default CanvasRenderer;