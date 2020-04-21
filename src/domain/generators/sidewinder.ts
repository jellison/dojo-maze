import IGenerator from './generator';
import Grid from '../Grid';
import Cell from '../Cell';
import { choose, sample } from '../Random';
import { v4 as uuid } from 'uuid';

export default class Sidewinder implements IGenerator {
  public id: string = uuid();
  public name: string = 'Sidewinder';

  generate(grid: Grid) {
    for (let row of grid.rows) {
      let run: Cell[] = [];

      for (let cell of row) {
        run.push(cell);

        const atEasternBoundary = Boolean(!cell.east);
        const atNorthernBoundary = Boolean(!cell.north);
        const shouldCloseOut = atEasternBoundary || (!atNorthernBoundary && choose());

        if (shouldCloseOut) {
          const member = sample(run);
          if (member.north) member.link(member.north);
          run = [];
        } else {
          cell.link(cell.east);
        }
      }
    }

    return grid;
  }
}
