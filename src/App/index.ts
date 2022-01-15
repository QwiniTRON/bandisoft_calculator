import {format, unformat} from "./format";
import {SQRT_OPERATION, calc} from "./calc";


const calculators = document.querySelectorAll(`[data-element="calculator"]`);


enum Actions {
  add = "add",
  delete = "delete",
  calc = "calc"
}


for (const calculator of Array.from(calculators)) {
  let currentValue = "";

  const calcInput = calculator.querySelector<HTMLInputElement>(`[data-element="formField"]`);
  const calcField = calculator.querySelector<HTMLDivElement>(`[data-element="calculatorTemplate"]`);
  const calcOutput = calculator.querySelector<HTMLDivElement>(`[data-element="calculatorOutput"]`);
  const calcForm = calculator.querySelector<HTMLFormElement>(`[data-element="calculatorForm"]`);

  const setCurrentExpression = function setCurrentExpression() {
    if (Boolean(calcInput) === false) return;

    calcInput!.value = format(currentValue);
  };

  const setOutput = function setOutput(str: string) {
    calcOutput!.textContent = str;
  };

  // press enter on input
  calcForm?.addEventListener("submit", function (e: SubmitEvent) {
    e.preventDefault();

    if (Boolean(calcOutput) === false) return;

    if (currentValue) {
      try {
        setOutput(String(calc(currentValue)));
      } catch (err) {
        setOutput("Wrong format");
      }
    }
  });

  // click on button(operator)
  calcField?.addEventListener("click", function (e: Event) {
    const target = e.target as HTMLElement;
    const action = target.dataset.action;
    const value = target.dataset.value;

    if (action === Actions.add) {
      const isSqrtEnd = currentValue.endsWith(SQRT_OPERATION);

      if (isSqrtEnd && isFinite(Number(value))) {
        currentValue = currentValue.slice(0, -5) + value + SQRT_OPERATION;
      } else if ((isSqrtEnd && value !== SQRT_OPERATION) || isSqrtEnd === false) {
        currentValue += value;
      }
    }

    if (action === Actions.delete) {
      const matchSqrt = currentValue.match(/(\d*)\*\*0.5$/i);

      if (matchSqrt && matchSqrt[1] === "") {
        currentValue = currentValue.slice(0, -5);
      } else if (matchSqrt?.[1]) {
        currentValue = currentValue.slice(0, -6) + SQRT_OPERATION;
      } else {
        currentValue = currentValue.slice(0, -1);
      }
    }

    if (action === Actions.calc && currentValue) {
      try {
        setOutput(String(calc(currentValue)));
      } catch (err) {
        setOutput("Wrong format");
      }
    }

    setCurrentExpression();
  });

  calcInput?.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement;

    currentValue = unformat(target.value.trim());
  });
}


