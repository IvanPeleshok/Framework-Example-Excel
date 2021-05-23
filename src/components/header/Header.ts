import { Dom } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import { IOptions } from '../../interface/interface';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root: Dom, options: IOptions) {
    super($root, {
      name: 'Header',
      ...options
    })
  }

  toHTML() {
    return `
      <input type="text" class="input" value="Новая таблица" />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `
  }
}
