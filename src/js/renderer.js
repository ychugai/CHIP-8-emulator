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
    const { width, height, cellSize } = this;
    this.ctx.clearRect(0, 0, width * cellSize, height * cellSize);
  }

  render(display) {
    const { width, cellSize, bgColor, fgColor } = this;
    this.clear();
    for (let i = 0; i < display.length; i++) {
      let x = (i % width) * cellSize;
      let y = Math.floor(i / width) * cellSize;

      this.ctx.fillStyle = [bgColor, fgColor][display[i]];
      this.ctx.fillRect(x, y, cellSize, cellSize);
    }
    this.draws++;
  }

  setCellSize(cellSize) {
    const { width, height } = this;
    
    this.cellSize = +cellSize;

    this.canvas.width = cellSize * width;
    this.canvas.height = cellSize * height;

    this.render(this.lastRenderedData);
  }
}

export default CanvasRenderer;