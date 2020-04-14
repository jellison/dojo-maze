import Generator from './generator';
import Grid from '../Grid';
import { sampleAndRemove, sample } from '../Random';

export default class Wilsons implements Generator {
  public generate(grid: Grid) {
    const unvisited = [...grid.cells];

    sampleAndRemove(unvisited);
    while (unvisited.length > 0) {
      let current = sample(unvisited);
      let path = [current];

      // until we find a `current` already in our path, add a random neightbor to our path
      while (unvisited.includes(current)) {
        current = sample(current.neighbors);

        let position = path.indexOf(current);
        if (position >= 0) {
          path = path.splice(0, position + 1);
        } else {
          path.push(current);
        }
      }

      for (let i = 0; i < path.length - 1; i++) {
        path[i].link(path[i + 1]);
        unvisited.splice(unvisited.indexOf(path[i]), 1);
      }
    }
  }
}
