import { Dom } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent'
import { IOptions } from '../../interface/interface';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root: Dom, options: IOptions) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'], 
      ...options
    });
  }

  toHTML() {
    return `
      <div class="button">
        <i class="material-icons">format_align_left</i>
      </div>

      <div class="button">
        <i class="material-icons">format_align_center</i>
      </div>

      <div class="button">
        <i class="material-icons">format_align_right</i>
      </div>

      <div class="button">
        <i class="material-icons">format_bold</i>
      </div>

      <div class="button">
        <i class="material-icons">format_italic</i>
      </div>

      <div class="button">
        <i class="material-icons">format_underlined</i>
      </div>
    `
  }

  onClick(event: MouseEvent) {
    console.log(event.target);
  }
}
