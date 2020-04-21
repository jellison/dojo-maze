import IGenerator from './generator';
import Grid from '../Grid';
import { sample } from '../Random';
import { v4 as uuid } from 'uuid';

export class AldousBroder implements IGenerator {
  public id: string = uuid();
  public name: string = 'Aldous Broder';

  generate(grid: Grid) {
    let current = sample(grid.cells);
    let unvisited = grid.rowCount * grid.columnCount - 1;

    while (unvisited > 0) {
      const neighbor = sample(current.neighbors);

      if (neighbor.links.length === 0) {
        current.link(neighbor);
        unvisited -= 1;
      }

      current = neighbor;
    }

    return grid;
  }
}
