import { tsx, create } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';

import GridRender from './components/grid-render/GridRender';

import * as css from './App.m.css';
import Grid from './domain/Grid';

import Wilsons from './domain/generators/wilsons';
import IGenerator from './domain/generators/generator';
import { AldousBroder } from './domain/generators/aldous-broder';
import Sidewinder from './domain/generators/sidewinder';
import { HuntAndKill } from './domain/generators/hunt-and-kill';
import { selectFactory } from './components/select/Select';

interface AppCache {
  generators: IGenerator[];
  selectedGenerator?: IGenerator;
  height?: number;
  width?: number;
  grid?: Grid;
}

const GeneratorSelect = selectFactory<IGenerator>();
const icache = createICacheMiddleware<AppCache>();
const factory = create({ icache });

export default factory(function App({ middleware: { icache } }) {
  const generators = icache.getOrSet('generators', [new AldousBroder(), new Wilsons(), new Sidewinder(), new HuntAndKill()]);

  const selectedGenerator = icache.get('selectedGenerator');
  const height = icache.getOrSet('height', 20);
  const width = icache.getOrSet('width', 20);
  const grid = icache.get('grid');

  return (
    <div classes={[css.root]}>
      <nav class="navbar is-primary">
        <div class="container">
          <div class="navbar-brand">
            <h1 class="navbar-item">Dojo Maze Generator</h1>
          </div>
        </div>
      </nav>
      <div class="container">
        <div class="form">
          <div class="field-row">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Size</label>
              </div>
              <div class="field-body">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static">Width</a>
                  </p>
                  <p class="control">
                    <input
                      type="text"
                      class="input"
                      value={width ? width.toString() : ''}
                      onblur={(evt) => {
                        const parsed = parseInt((evt.target as HTMLInputElement).value);
                        icache.set('width', isNaN(parsed) ? undefined : parsed);
                      }}
                    />
                  </p>
                </div>
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static">Height</a>
                  </p>
                  <p class="control">
                    <input
                      type="text"
                      class="input"
                      value={height ? height.toString() : ''}
                      onblur={(evt) => {
                        const parsed = parseInt((evt.target as HTMLInputElement).value);
                        icache.set('height', isNaN(parsed) ? undefined : parsed);
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Algorithm</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <GeneratorSelect
                    items={generators}
                    selectedItem={selectedGenerator}
                    onSelectionChanged={(selected) => icache.set('selectedGenerator', selected)}
                  />
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button
                  class="button is-primary"
                  onclick={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();

                    if (width && height && selectedGenerator) {
                      icache.set('grid', selectedGenerator.generate(new Grid(width, height)));
                    }
                  }}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {grid && (
          <div classes={css.mazeWrapper}>
            <div class="box">
              <Outlet key="home" id="home" renderer={() => <GridRender grid={grid} />} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
