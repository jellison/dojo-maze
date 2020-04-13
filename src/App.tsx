import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import Outlet from '@dojo/framework/routing/Outlet';

import GridRender from './components/grid-render/GridRender';

import * as css from './App.m.css';
import Grid from './domain/Grid';
// import Sidewinder from './domain/generators/sidewinder';
import { AldousBroder } from './domain/generators/aldous-broder';

const factory = create({ theme });

export default factory(function App({ middleware: { theme } }) {
  const grid = new Grid(20, 20);

  const generator = new AldousBroder();
  generator.generate(grid);

  return (
    <div classes={[css.root]}>
      <div classes={['container']}>
        <div classes={['columns']}>
          <div classes={['column', 'is-8', 'is-offset-2']}>
            <div classes={['box']}>
              <Outlet key="home" id="home" renderer={() => <GridRender grid={grid} />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
