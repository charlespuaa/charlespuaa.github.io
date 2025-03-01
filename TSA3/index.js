
const display = document.querySelector('.screen');
const btns = document.querySelectorAll('.buttons button');

let currentInput = '';
let firstNum = null;
let op = null;
let darkMode = false;

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-val');
    
    // num or dot
    if (btn.classList.contains('num') || val === '.') {
      currentInput += val;
      display.value = currentInput;
    }
    // if opr
    else if (btn.classList.contains('opr')) {
      // dark mode pag pinindot c
      if (val === 'C') {
        darkMode = !darkMode;
        if (darkMode) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
        // clear C
        currentInput = '';
        firstNum = null;
        op = null;
        display.value = '';
      }
      // backspace (<)
      else if (val === '<') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
      }
      // equal - and change background color
      else if (val === '=') {
        if (firstNum !== null && op && currentInput !== '') {
          const secondNum = parseFloat(currentInput);
          const result = compute(firstNum, secondNum, op);
          display.value = result;
          currentInput = result.toString();
          firstNum = null;
          op = null;
          
          changeBackgroundColor();
        }
      }
      // other ops
      else {
        if (currentInput !== '') {
          firstNum = parseFloat(currentInput);
          op = (val === 'X') ? '*' : val;
          currentInput = '';
        }
      }
    }
  });
});

// arithmetic function
function compute(a, b, operator) {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error';
    default: return b;
  }
}


function changeBackgroundColor() {
  const backgrounds = [
    "rgba(255, 255, 255, 0.85)",
    "rgba(220, 240, 189, 0.85)",
    "rgba(222, 183, 183, 0.85)",
    "rgba(213, 223, 251, 0.85)",
    "rgba(187, 249, 211, 0.85)"
  ];
  const randIndex = Math.floor(Math.random() * backgrounds.length);
  document.body.style.background = backgrounds[randIndex];
}
