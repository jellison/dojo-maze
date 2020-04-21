import { create, tsx } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import i18n from '@dojo/framework/core/middleware/i18n';
import theme from '@dojo/framework/core/middleware/theme';

export interface SelectProperties<T> {
  items: T[];
  selectedItem?: T;
  onSelectionChanged?(item: T): void;
}

interface SelectCache {}

const icache = createICacheMiddleware<SelectCache>();

export function selectFactory<T extends { id: string; name: string }>() {
  const factory = create({ theme, icache, i18n }).properties<SelectProperties<T>>();

  return factory(function Select({ middleware: { theme, icache, i18n }, properties }) {
    const { items, selectedItem, onSelectionChanged } = properties();

    function selectIndex(index: number) {
      onSelectionChanged && onSelectionChanged(items[index]);
    }

    if (!selectedItem && items.length > 0) {
      selectIndex(0);
    }

    return (
      <div class="control">
        <div class="select">
          <select
            onchange={(evt) => {
              selectIndex((evt.target as HTMLSelectElement).selectedIndex);
            }}
          >
            {items.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>
    );
  });
}

export default selectFactory();
