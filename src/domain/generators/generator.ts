import Grid from '../Grid';

export default interface Generator {
  generate(grid: Grid): void;
}
