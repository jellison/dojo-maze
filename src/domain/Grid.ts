import Cell from './Cell';

export default class Grid {
  public start?: Cell;
  public end?: Cell;

  public rows: Cell[][];
  public get cells() {
    return this.rows.reduce((prev, curr) => prev.concat(curr));
  }

  constructor(public readonly rowCount: number, public readonly columnCount: number) {
    this.rows = [];

    // initialize grid
    for (let row = 0; row < rowCount; row++) {
      this.rows.push([]);
      for (let column = 0; column < columnCount; column++) {
        this.rows[row].push(new Cell(row, column));
      }
    }

    // initialize grid relationships
    for (let row = 0; row < rowCount; row++) {
      for (let column = 0; column < columnCount; column++) {
        const cell = this.rows[row][column];

        if (row > 0) cell.south = this.rows[row - 1][column];
        if (row < this.rowCount - 1) cell.north = this.rows[row + 1][column];
        if (column > 0) cell.west = this.rows[row][column - 1];
        if (column < this.columnCount - 1) cell.east = this.rows[row][column + 1];

        if (row === 0 && column === 0) this.start = cell;
        if (row === this.rowCount - 1 && column == this.columnCount - 1) this.end = cell;
      }
    }
  }
}
