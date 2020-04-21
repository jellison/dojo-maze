import Grid from '../Grid';

export default interface IGenerator {
  id: string;
  name: string;

  generate(grid: Grid): Grid;
}
