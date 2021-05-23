import { $, Dom } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent'
import { nextSelector, range } from '../../core/utils';
import { IOptions } from '../../interface/interface';
import { createTable } from './table.template'
import { TableSelection } from './TableSelection';

enum PartTable {
  Row = 'row',
  Column = 'column',
}

export class Table extends ExcelComponent {
  static className = 'excel__table';

  $parent: Dom;
  $resizer: Dom;
  mode: PartTable;
  cells: NodeListOf<HTMLElement>;
  coords: DOMRect;
  diff: number;
  selection: TableSelection;

  constructor($root: Dom, options: IOptions) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      name: 'Table',
      ...options
    });
  }

  private stopResizing = () => {
    if (this.$resizer && (this.$resizer.$el !== this.$parent.$el)) {
      if (this.mode === PartTable.Column) {
        const width = this.coords.width + this.diff;
        this.cells.forEach((column: HTMLElement) => $(column).css({width: width + 'px'}));
        this.$resizer.css({opacity: 0, height: 'auto', right: 0});
      }
      if (this.mode === PartTable.Row) {
        this.$resizer.css({opacity: 0, width: 'auto'});
      }
    }
    this.$root.off('mouseup', this.stopResizing);
  }

  private setWidth = (ev: MouseEvent) =>  {
      this.diff = ev.pageX - this.coords.right;
      this.$resizer.css({right: -this.diff + 'px'});
  }

  private setHeight = (ev: MouseEvent) => {
    const diff = ev.pageY - this.coords.bottom;
    const height = this.coords.height + diff;
    this.$parent.css({height: height + 'px'});
  }

  private resizeLogic($target: Dom) {
    this.$parent = this.$resizer.closest('[data-type="resizable"]');
    const data = this.$parent.dataset.column;
    this.cells = this.$root.findAll(`[data-column="${data}"]`);

    if (this.$parent.$el && (this.$resizer.$el !== this.$parent.$el)) {

      this.coords = this.$parent.getCoords();
      this.mode = $target.dataset.resize as PartTable;
      if (this.mode === PartTable.Column) {
        this.$resizer.css({opacity: 1, zIndex: 1000, height: this.$root.getCoords().height + 'px'});
        this.$root.on('mousemove', this.setWidth);
        this.$root.on('mouseup', () => this.$root.off('mousemove', this.setWidth));
      }
      
      if (this.mode === PartTable.Row) {
        this.$resizer.css({opacity: 1, zIndex: 1000, width: this.$root.getCoords().width + 'px'});
        this.$root.on('mousemove', this.setHeight);
        this.$root.on('mouseup', () => this.$root.off('mousemove', this.setHeight));
      }

      this.$root.on('mouseup', this.stopResizing);
    }
  }

  private selectLogic(ev: MouseEvent, $target: Dom) {
    if (ev.shiftKey) {
      const target = $target.id(true);
      const current = this.selection.current.id(true);
      const cols = range(current.col, target.col);
      const rows = range(current.row, target.row);
      const ids = cols.map((col) => rows.map(row => `${row}:${col}`)).flat();
      const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));
      this.selection.selectGroup($cells);
    } else {
      this.selection.select($target); 
    }
  }

  private selectCell($cell: Dom) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  public onMousedown(ev: MouseEvent) {
    const $target = $(ev.target as HTMLElement);
    this.$resizer = $target;

    if (this.$resizer.dataset.border) {
      this.resizeLogic($target);
    }

    if ($target.dataset.id) {
      this.selectLogic(ev, $target);
    }
    if ($target.dataset.id) {
      this.selectCell($target);
    }
  }

  public onKeydown(ev: KeyboardEvent) {
    const navigoKeys = ['Enter', 'Tab', 'ArrowLeft','ArrowRight', 'ArrowDown', 'ArrowUp'];
    if (navigoKeys.includes(ev.key) && !ev.shiftKey) {
      ev.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(ev.key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target as HTMLElement))
  }

  protected prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="1:1"]');
    this.selectCell($cell)
    this.$on('formula:input', text => this.selection.current.text(text));
    this.$on('formula:done', () => this.selection.current.focus());
  }

  toHTML() {
    return createTable(20);
  }
}
