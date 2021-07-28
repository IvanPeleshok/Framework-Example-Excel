import { InitialStateT } from "../../state/initialState";
import { StateT } from "../../state/state";
import { IColState } from "../../state/types";

enum CODES {
  A = 65,
  Z = 90
}

const DEFAULT_WIDTH = 120;

function toCell(row, state: IColState) {
  return function(_, col) {
    const width = state[col] || DEFAULT_WIDTH;
    return `
      <div class="cell" contenteditable data-column="${col}" data-id="${row+1}:${col+1}" style="width: ${width}px"></div>
    `
  }
}

function toColumn(state: IColState) {
  return function(col: string, index: number ) {
    const width = state[index] || DEFAULT_WIDTH;
    return `
      <div class="column" data-type="resizable" data-column="${index}" style="width: ${width}px">
        ${col}
        <div class="col-resize" data-resize="column" data-border="border"></div>
      </div>
    `
  }
}

function createRow(index: number, content: string) {
  const cell = index ? `${index}<div class="row-resize" data-border="border" data-resize="row"></div>` : ''; 
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

export function createTable(rowsCount: number = 15, state: InitialStateT) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn(state.colState))
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state.colState))
        .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
