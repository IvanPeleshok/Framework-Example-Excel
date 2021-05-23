enum CODES {
  A = 65,
  Z = 90
}

function toCell(row) {
  return function(_, col) {
    return `
      <div class="cell" contenteditable data-column="${col}" data-id="${row+1}:${col+1}"></div>
    `
  }
}

function toColumn(col: string, index: number ) {
  return `
    <div class="column" data-type="resizable" data-column="${index}">
      ${col}
      <div class="col-resize" data-resize="column" data-border="border"></div>
    </div>
  `
}

function createRow(index: number, content: string) {
  const cell = index ? `${index}<div class="row-resize" data-resize="row" data-border="border"></div>` : ''; 
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${cell}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index: number) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount: number = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
