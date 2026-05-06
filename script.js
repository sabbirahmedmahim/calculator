class Timer {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
    }

    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.updateTime(), 1000);
            this.isRunning = true;
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
        }
    }

    reset() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.elapsedTime = 0;
        this.render(0, 0, 0);
    }

    updateTime() {
        this.elapsedTime = Date.now() - this.startTime;
        let totalSeconds = Math.floor(this.elapsedTime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;
        
        this.render(hours, minutes, seconds);
    }

    render(h, m, s) {
        const format = num => num.toString().padStart(2, '0');
        this.displayElement.innerText = `${format(h)}:${format(m)}:${format(s)}`;
    }
}

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    computeImmediate(action) {
        let current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        if (action === 'sqrt') this.currentOperand = Math.sqrt(current).toString();
        if (action === 'square') this.currentOperand = Math.pow(current, 2).toString();
        if (action === 'percent') this.currentOperand = (current / 100).toString();
        
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '*': computation = prev * current; break;
            case '/': 
                if (current === 0) {
                    this.clear();
                    this.currentOperand = "Error";
                    this.updateDisplay();
                    return;
                }
                computation = prev / current; 
                break;
            case '^': computation = Math.pow(prev, current); break;
            default: return;
        }
        
        this.currentOperand = (Math.round(computation * 1000000000) / 1000000000).toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand || '0';
        
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

const timerDisplay = document.getElementById('timer-display');
const stopwatch = new Timer(timerDisplay);

document.getElementById('timer-start').addEventListener('click', () => stopwatch.start());
document.getElementById('timer-pause').addEventListener('click', () => stopwatch.pause());
document.getElementById('timer-reset').addEventListener('click', () => stopwatch.reset());

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const actionButtons = document.querySelectorAll('[data-action]');
const funcButtons = document.querySelectorAll('[data-immediate]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.currentOperand === "Error") calculator.clear();
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.currentOperand === "Error") calculator.clear();
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
    });
});

funcButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.currentOperand === "Error") calculator.clear();
        calculator.computeImmediate(button.dataset.immediate);
    });
});

actionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        if (action === 'clear') calculator.clear();
        if (action === 'calculate') calculator.compute();
        calculator.updateDisplay();
    });
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

document.addEventListener('keydown', e => {
    if (calculator.currentOperand === "Error") calculator.clear();
    
    if (e.key >= 0 && e.key <= 9 || e.key === '.') {
        calculator.appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calculator.chooseOperation(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculator.compute();
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
        calculator.clear();
    }
    calculator.updateDisplay();
});
