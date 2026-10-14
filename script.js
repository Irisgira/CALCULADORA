const display = document.getElementById('display');
const face = document.getElementById('face');
const FACES = { normal: '\u{1F63A}', happy: '\u{1F63B}', sad: '\u{1F63F}' };

let a = 0;        // primer número
let op = null;    // operador pendiente
let fresh = true; // el próximo dígito empieza un número nuevo

document.querySelector('.keys').addEventListener('click', (e) => {
  const k = e.target.dataset.k;
  if (!k) return;

  if (k === 'C') {
    a = 0; op = null; fresh = true;
    display.textContent = '0';
    face.textContent = FACES.normal;
  } else if (k === '.') {
    if (fresh) display.textContent = '0.';
    else if (!display.textContent.includes('.')) display.textContent += '.';
    fresh = false;
  } else if (!isNaN(k)) {
    if (fresh || display.textContent === '0') display.textContent = k;
    else if (display.textContent.length < 12) display.textContent += k;
    fresh = false;
  } else {
    // operador o "="
    if (op && !fresh) {
      const b = +display.textContent;
      const r = op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : a / b;
      if (!isFinite(r)) {
        display.textContent = 'Error';
        face.textContent = FACES.sad;
        op = null; fresh = true;
        return;
      }
      display.textContent = +r.toPrecision(12);
    }
    a = +display.textContent || 0;
    op = k === '=' ? null : k;
    face.textContent = k === '=' ? FACES.happy : FACES.normal;
    fresh = true;
  }
});
