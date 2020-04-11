export default class Cell {
  public north?: Cell;
  public south?: Cell;
  public east?: Cell;
  public west?: Cell;

  constructor(public row: number, public column: number) {}

  public linkedTo(cell?: Cell) {
    return true;
  }
}
