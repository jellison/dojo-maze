export default class Cell {
  public north?: Cell;
  public south?: Cell;
  public east?: Cell;
  public west?: Cell;

  private links: Cell[] = [];

  constructor(public row: number, public column: number) {}

  public link(cell?: Cell, bidi: boolean = true) {
    if (!cell) return;

    if (!this.linkedTo(cell)) {
      this.links.push(cell);
    }
    if (bidi) {
      cell.link(this, false);
    }
  }

  public linkedTo(cell?: Cell) {
    return cell ? this.links.includes(cell) : false;
  }
}
