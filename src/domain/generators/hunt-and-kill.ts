import IGenerator from './generator';
import Grid from '../Grid';
import { v4 as uuid } from 'uuid';

export class HuntAndKill implements IGenerator {
  public id: string = uuid();
  public name: string = 'Hunt and Kill';

  public generate(grid: Grid) {
    return grid;
  }
}
