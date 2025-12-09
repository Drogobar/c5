export class Calculator {
  constructor() {
    this.currentInput = '0';
    this.shouldResetDisplay = false;
  }

  getValue() {
    return this.currentInput;
  }

  appendNumber(number) {
    if (this.shouldResetDisplay) {
      this.currentInput = '0';
      this.shouldResetDisplay = false;
    }

    this.currentInput =
      this.currentInput === '0' ? number : this.currentInput + number;
    return this.currentInput;
  }

  appendDecimal() {
    if (this.shouldResetDisplay) {
      this.currentInput = '0';
      this.shouldResetDisplay = false;
    }

    if (!this.currentInput.includes('.')) {
      this.currentInput += '.';
    }
    return this.currentInput;
  }

  appendOperator(operator) {
    if (this.shouldResetDisplay) {
      this.shouldResetDisplay = false;
    }

    const lastChar = this.currentInput[this.currentInput.length - 1];
    if (['+', '-', '*', '/'].includes(lastChar)) {
      this.currentInput = this.currentInput.slice(0, -1) + operator;
    } else {
      this.currentInput += operator;
    }
    return this.currentInput;
  }

  calculate() {
    try {
      const expression = this.currentInput.replace(/×/g, '*');

      if (expression.includes('/0') && !expression.includes('/0.')) {
        this.currentInput = 'Ошибка';
        this.shouldResetDisplay = true;
        return this.currentInput;
      }

      // eslint-disable-next-line no-new-func
      const result = Function('"use strict"; return (' + expression + ')')();

      if (Number.isNaN(result) || !Number.isFinite(result)) {
        this.currentInput = 'Ошибка';
      } else {
        this.currentInput = result.toString();
      }

      this.shouldResetDisplay = true;
      return this.currentInput;
    } catch (error) {
      this.currentInput = 'Ошибка';
      this.shouldResetDisplay = true;
      return this.currentInput;
    }
  }

  clear() {
    this.currentInput = '0';
    this.shouldResetDisplay = false;
    return this.currentInput;
  }

  deleteLast() {
    if (this.shouldResetDisplay) {
      return this.clear();
    }

    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = '0';
    }
    return this.currentInput;
  }
}




