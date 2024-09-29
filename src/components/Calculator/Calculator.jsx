import React, { useRef, useReducer } from 'react';
import './Calculator.css'; // Archivo CSS para estilos

const Calculator = () => {
  const inputRef = useRef(null);
  const firstNumber = useRef(null);
  const operation = useRef(null);
  const historicalResults = useRef([]);
  const lastResult = useRef(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0); // Para forzar re-renderizado

  // Manejar la entrada del segundo número y calcular el resultado
  const handleEqual = () => {
    const inputValue = parseFloat(inputRef.current.value);
    if (isNaN(inputValue)) {
      alert('Por favor, introduce el segundo número.');
      return;
    }
    if (firstNumber.current === null || operation.current === null) {
      alert('Por favor, introduce el primer número y selecciona una operación antes de calcular el resultado.');
      return;
    }

    const secondNumber = inputValue;
    const result = calculateResult(firstNumber.current, secondNumber, operation.current);

    // Guardar el resultado
    historicalResults.current.push(result);
    historicalResults.current.sort((a, b) => a - b); // Ordenar de menor a mayor

    // Actualizar el último resultado
    lastResult.current = result;

    // Limpiar el input y variables
    firstNumber.current = null;
    operation.current = null;
    inputRef.current.value = '';

    forceUpdate(); // Forzar re-renderizado para actualizar la UI
  };

  // Manejar selección de operación y asignar el primer número
  const handleOperation = (op) => {
    const inputValue = parseFloat(inputRef.current.value);
    if (isNaN(inputValue)) {
      alert('Por favor, introduce el primer número antes de seleccionar una operación.');
      return;
    }
    firstNumber.current = inputValue;
    operation.current = op;
    inputRef.current.value = '';
  };

  // Función para calcular el resultado según la operación
  const calculateResult = (num1, num2, op) => {
    switch (op) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num2 !== 0 ? num1 / num2 : 'Error: División por cero';
      case '%':
        return num2 !== 0 ? num1 % num2 : 'Error: División por cero';
      default:
        return 'Operación no válida';
    }
  };

  return (
    <div className="calculator-container">
      <h2>Calculadora</h2>
      <input
        ref={inputRef}
        type="number"
        placeholder="Introduce un número"
        className="input-style"
      />
      <div className="button-container">
        {/* Botones para seleccionar la operación */}
        <button onClick={() => handleOperation('+')} className="button-style">
          +
        </button>
        <button onClick={() => handleOperation('-')} className="button-style">
          -
        </button>
        <button onClick={() => handleOperation('*')} className="button-style">
          x
        </button>
        <button onClick={() => handleOperation('/')} className="button-style">
          /
        </button>
        <button onClick={() => handleOperation('%')} className="button-style">
          %
        </button>
        <button onClick={handleEqual} className="button-style">
          =
        </button>
      </div>
      <h3>
        Último resultado:{' '}
        {lastResult.current !== null ? lastResult.current : '-'}
      </h3>
      <h3>Resultados históricos</h3>
      <ul className="history-list">
        {historicalResults.current.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calculator;
