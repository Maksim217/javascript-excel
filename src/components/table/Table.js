import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '../../core/dom';
import {
  applyStyle,
  tableResize,
  changeText,
  changeStyles,
} from '../../redux/actions';
import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (text) => {
      this.selection.current.attr('data-value', text).text(parse(text));
      this.updateTextInStore(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
        applyStyle({
          value,
          ids: this.selection.selectedIds,
        }),
      );
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(changeStyles(styles));
  }

  updateTextInStore(value) {
    this.$dispatch(
      changeText({
        id: this.selection.current.id(),
        value,
      }),
    );
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(tableResize(data));
    } catch (e) {
      console.warn('Resize error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`),
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowRight',
      'ArrowLeft',
      'ArrowDown',
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }
}
