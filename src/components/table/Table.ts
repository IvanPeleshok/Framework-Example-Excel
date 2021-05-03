import { $, Dom } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'

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

  MIN_WIDTH = 40;

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  private stopResizing = () => {
    if (this.$resizer) {
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

  onMousedown(ev: MouseEvent) {
    const $target = ev.target as HTMLElement;
    this.$resizer = $($target);
    if (this.$resizer.dataset.border) {
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
  }

  toHTML() {
    return createTable(20);
  }
}
