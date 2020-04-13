export default class Cell {
  public north?: Cell;
  public south?: Cell;
  public east?: Cell;
  public west?: Cell;
  public get neighbors(): Cell[] {
    return [this.north, this.south, this.east, this.west].filter((n) => n !== undefined) as Cell[];
  }
  public get links(): Readonly<Cell[]> {
    return this._links;
  }

  private _links: Cell[] = [];

  constructor(public row: number, public column: number) {}

  public link(cell?: Cell, bidi: boolean = true) {
    if (!cell) return;

    if (!this.linkedTo(cell)) {
      this._links.push(cell);
    }
    if (bidi) {
      cell.link(this, false);
    }
  }

  public linkedTo(cell?: Cell) {
    return cell ? this._links.includes(cell) : false;
  }
}
