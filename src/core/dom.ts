
export class Dom {
  $el: HTMLElement;

  constructor(selector: string | HTMLElement) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  html(HTML: string): Dom {
    this.$el.innerHTML = HTML;
    return this;
  }

  clear(): Dom {
    this.html('');
    return this;
  }

  on(eventType: string, callback: () => void) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType: string, callback: () => void) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node: HTMLElement | Dom): Dom {
    let nodeHTML: HTMLElement;

    if (node instanceof Dom) {
      nodeHTML = node.$el;
    } else {
      nodeHTML = node as HTMLElement;
    }

    if (Element.prototype.append) {
      this.$el.append(nodeHTML);
    } else {
      this.$el.appendChild(nodeHTML);
    }

    return this;
  }
}

export function $(selector: string) {
  return new Dom(selector);
}

$.create = (tagName: any, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
}
