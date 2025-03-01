// Get references to the display and all buttons
const display = document.querySelector('.screen');
const btns = document.querySelectorAll('.buttons button');

let currentInput = '';
let firstNum = null;
let op = null;
let darkMode = false;

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-val');
    
    //  add to currentInput
    if (btn.classList.contains('num') || val === '.') {
      currentInput += val;
      display.value = currentInput;
    }
    // if opr
    else if (btn.classList.contains('opr')) {
      // When 'C' is pressed: clear and toggle dark mode
      if (val === 'C') {
        darkMode = !darkMode;
        if (darkMode) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
        // clear calc
        currentInput = '';
        firstNum = null;
        op = null;
        display.value = '';
      }
      // backspace
      else if (val === '<') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
      }
      // equals
      else if (val === '=') {
        if (firstNum !== null && op && currentInput !== '') {
          const secondNum = parseFloat(currentInput);
          const result = compute(firstNum, secondNum, op);
          display.value = result;
          currentInput = result.toString();
          firstNum = null;
          op = null;
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
