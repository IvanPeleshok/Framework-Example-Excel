import { $, Dom } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent"
import { IOptions } from "../../interface/interface";

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root: Dom, options: IOptions) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event: KeyboardEvent) {
    this.$emit('formula:input', $(event.target as HTMLElement).text());
  }

  onKeydown(event: KeyboardEvent) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }

  init() {
    super.init();

    let formula = this.$root.find('#formula');
    this.$on('table:select', $cell => formula.text($cell.text()));
    this.$on('table:input', $cell => formula.text($cell.text()));
  }

}
