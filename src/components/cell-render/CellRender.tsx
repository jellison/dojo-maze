import { create, tsx } from '@dojo/framework/core/vdom';
import Cell from '../../domain/Cell';
import { createClassArray } from '../../common/class-helper';

import * as css from './CellRender.m.css';

export interface CellRenderProperties {
  cell: Cell;
}

const factory = create().properties<CellRenderProperties>();

export default factory(function CellRender({ properties }) {
  const { cell } = properties();

  return (
    <div
      key="root"
      classes={createClassArray(css.cell, {
        [css.left]: !cell.west || !cell.linkedTo(cell.west),
        [css.right]: !cell.east,
        [css.top]: !cell.north || !cell.linkedTo(cell.north),
        [css.bottom]: !cell.south
      })}
    />
  );
});
