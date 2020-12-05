const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `<div class="cell" contenteditable></div>`;
}

function toColumn(el) {
  return `<div class="column">${el}</div>`;
}

function createRow(info = '', content = '') {
  return `
        <div class="row">
            <div class="row-info">${info}</div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = Array(colsCount).fill('').map(toChar).map(toColumn).join('');
  rows.push(createRow(undefined, cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, Array(colsCount).fill('').map(toCell).join('')));
  }

  return rows.join('');
}
