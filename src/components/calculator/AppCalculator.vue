<script setup>
import { ref } from 'vue'
import ButtonGrid from './ButtonGrid.vue'
import CalcDisplay from './CalcDisplay.vue'

const expression = ref('')
const currentOperator = ref('')
const firstOperand = ref(null)

function calculate(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return b !== 0 ? a / b : '연산 불가'
    default:
      return '오류'
  }
}

function handleInput(value) {
  if (['+', '-', '*', '/'].includes(value)) {
    if (expression.value !== '') {
      firstOperand.value = parseFloat(expression.value)
      currentOperator.value = value
      expression.value = ''
    }
  } else if (value === '=') {
    const secondOperand = parseFloat(expression.value)
    const result = calculate(firstOperand.value, secondOperand, currentOperator.value)
    expression.value = result.toString()
    firstOperand.value = null
    currentOperator.value = ''
  } else if (value === 'AC') {
    expression.value = ''
    firstOperand.value = null
    currentOperator.value = ''
  } else if (value === 'delete') {
    expression.value = expression.value.slice(0, -1)
  } else {
    expression.value += value
  }
}
</script>

<template>
  <div class="calculator">
    <CalcDisplay :expression="expression" />
    <ButtonGrid @input="handleInput" />
  </div>
</template>

<style>
.calculator {
  width: 340px;
  background-color: rgb(241, 205, 211);
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.equation {
  color: whitesmoke;
  width: 70%;
  height: 60px;
  font-size: 1em;
  text-align: right;
  padding: 15px;
  background-color: brown;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow-x: auto;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 그리드 정렬 */
  grid-template-rows: repeat(5, 70px);
  gap: 8px;
  justify-content: center;
}
button {
  width: 60px;
  height: 50px;
  background-color: whitesmoke;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  border: none;
  border-radius: 20%;
}
button:active {
  background-color: plum;
}
button.button-icon i {
  font-size: 0.8em;
}
button.button-icon {
  background-color: antiquewhite;
}
</style>
