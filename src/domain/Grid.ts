import Cell from './Cell';

export default class Grid {
  public cells: Cell[][];

  constructor(public readonly rows: number, public readonly columns: number) {
    this.cells = [];

    // initialize grid
    for (let row = 0; row < rows; row++) {
      this.cells.push([]);
      for (let column = 0; column < columns; column++) {
        this.cells[row].push(new Cell(row, column));
      }
    }

    // initialize grid relationships
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const cell = this.cells[row][column];

        if (row > 0) cell.north = this.cells[row - 1][column];
        if (row < this.rows - 1) cell.south = this.cells[row + 1][column];
        if (column > 0) cell.east = this.cells[row][column - 1];
        if (column < this.columns - 1) cell.west = this.cells[row][column + 1];
      }
    }
  }
}
