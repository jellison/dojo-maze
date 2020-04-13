import Generator from './generator';
import Grid from '../Grid';
import Cell from '../Cell';
import { choose, sample } from '../Random';

export default class Sidewinder implements Generator {
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
  }
}
