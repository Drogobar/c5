import { describe, expect, it, beforeEach } from 'vitest';
import { Calculator } from '../src/Calculator.js';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('складывает числа и возвращает результат', () => {
    calculator.appendNumber('1');
    calculator.appendOperator('+');
    calculator.appendNumber('2');

    expect(calculator.calculate()).toBe('3');
  });

  it('заменяет оператор, если вводить несколько подряд', () => {
    calculator.appendNumber('5');
    calculator.appendOperator('+');
    calculator.appendOperator('-');

    expect(calculator.getValue()).toBe('5-');
  });

  it('добавляет только одну десятичную точку', () => {
    calculator.appendDecimal();
    calculator.appendNumber('5');
    calculator.appendDecimal();

    expect(calculator.getValue()).toBe('0.5');
  });

  it('делит корректно при ненулевом знаменателе', () => {
    calculator.appendNumber('8');
    calculator.appendOperator('/');
    calculator.appendNumber('2');

    expect(calculator.calculate()).toBe('4');
  });

  it('возвращает ошибку при делении на ноль', () => {
    calculator.appendNumber('7');
    calculator.appendOperator('/');
    calculator.appendNumber('0');

    expect(calculator.calculate()).toBe('Ошибка');
  });

  it('позволяет продолжать ввод после ошибки', () => {
    calculator.appendNumber('7');
    calculator.appendOperator('/');
    calculator.appendNumber('0');
    calculator.calculate(); // Ошибка, shouldResetDisplay = true

    calculator.appendNumber('3');
    expect(calculator.getValue()).toBe('3');
  });

  it('возвращает ошибку на некорректное выражение (оператор в конце)', () => {
    calculator.appendNumber('2');
    calculator.appendOperator('+');

    expect(calculator.calculate()).toBe('Ошибка');
  });

  it('удаляет символ, пока не останется 0', () => {
    calculator.appendNumber('1');
    calculator.appendNumber('2');
    calculator.appendNumber('3');
    calculator.deleteLast();
    calculator.deleteLast();
    calculator.deleteLast();

    expect(calculator.getValue()).toBe('0');
  });

  it('сбрасывает на 0 при deleteLast после вычисления', () => {
    calculator.appendNumber('4');
    calculator.appendOperator('*');
    calculator.appendNumber('5');
    calculator.calculate(); // 20, shouldResetDisplay = true

    calculator.deleteLast();
    expect(calculator.getValue()).toBe('0');
  });

  it('clear сбрасывает ввод', () => {
    calculator.appendNumber('9');
    calculator.appendOperator('+');
    calculator.appendNumber('1');
    calculator.clear();

    expect(calculator.getValue()).toBe('0');
  });
});

