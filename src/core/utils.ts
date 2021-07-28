// Pure functions
export function capitalize(string: string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end): number[] {
  if (start > end) [end, start] = [start, end];
  return new Array(end - start + 1).fill('').map((_, i) => start + i);
}

export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 1;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col--
      break
    case 'ArrowUp':
      row--
      break
  }

  return `[data-id="${row > MIN_VALUE ? row : MIN_VALUE}:${col > MIN_VALUE ? col : MIN_VALUE}"]`;
}

export function storage<T>(key, data = null): T {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
}