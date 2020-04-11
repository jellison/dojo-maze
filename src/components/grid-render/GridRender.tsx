import { create, tsx } from '@dojo/framework/core/vdom';
import Grid from '../../domain/Grid';
import resize from '@dojo/framework/core/middleware/resize';
import dimensions from '@dojo/framework/core/middleware/dimensions';

import * as css from './GridRender.m.css';
import CellRender from '../cell-render/CellRender';

export interface GridRenderProperties {
  grid: Grid;
}

const factory = create({ resize, dimensions }).properties<GridRenderProperties>();

export default factory(function GridRender({ middleware: { resize, dimensions }, properties }) {
  resize.get('root');
  const { grid } = properties();
  const width = dimensions.get('root').size.width;

  return (
    <div key="root" classes={css.root}>
      {grid.cells.map((row) => (
        <div classes={css.row} styles={{ height: `${width / grid.columns}px` }}>
          {row.map((cell) => (
            <CellRender cell={cell} />
          ))}
        </div>
      ))}
    </div>
  );
});
