"use strict";

class Calculator {
  constructor(previosOperandTextElement, currentOperandTextElement) {
    this.previosOperandTextElement = previosOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.previosOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand + number;
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previosOperand !== "") {
      this.compute();
    }
    this.previosOperand = this.currentOperand;
    this.currentOperand = "";
    this.operation = operation;
  }

  compute() {
    let computation;
    const prev = Number(this.previosOperand);
    const current = Number(this.currentOperand);
    if (this.currentOperand === "") return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;

      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previosOperand = "";
  }

  updateDisplay() {
    if (this.operation != null) {
      this.previosOperandTextElement.innerText = `${this.previosOperand}${this.operation}`;
    } else {
      this.previosOperandTextElement.innerText = "";
    }
    this.currentOperandTextElement.innerText = this.currentOperand;
  }
}

const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const previosOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");

const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");

const calculator = new Calculator(
  previosOperandTextElement,
  currentOperandTextElement
);

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
