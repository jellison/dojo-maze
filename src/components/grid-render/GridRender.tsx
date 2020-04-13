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
  const cellSize = dimensions.get('root').size.width / grid.columnCount;

  return (
    <div key="root" classes={css.root}>
      {grid.rows.reverse().map((row) => (
        <div classes={css.row}>
          {row.map((cell) => (
            <div classes={css.cell} styles={{ height: `${cellSize}px`, width: `${cellSize}px` }}>
              <CellRender cell={cell} start={grid.start === cell} end={grid.end === cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});
