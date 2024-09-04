document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
  
    const input = document.querySelector("input");
    input.value = "0";
  
    const activeButton = Array.from(document.querySelectorAll("button")).filter(
      (button) => !button.disabled
    );
    const numbers = activeButton.filter(
      (item) => !Number.isNaN(Number(item.innerText))
    );
    const notNumberButtons = activeButton.filter(
      (item) => !numbers.includes(item)
    );
  
    let operationValue = 0;
    let operation = "";
    let isNewInput = false;
  
    const performOperation = (inputValue, operationType) => {
      if (operationType === "+") {
        operationValue += inputValue;
      } else if (operationType === "-") {
        operationValue -= inputValue;
      } else if (operationType === "÷") {
        operationValue /= inputValue;
      } else if (operationType === "x") {
        operationValue *= inputValue;
      } else {
        operationValue = inputValue;
      }
      operation = operationType;
      isNewInput = true;
    };
  
    const setFirstValue = (operationSign, inputValue) => {
      operationValue = inputValue;
      operation = operationSign;
      isNewInput = true;
    };
  
    const setResultValue = (inputValue, operation) => {
      switch (operation) {
        case "+":
          input.value = operationValue + inputValue;
          break;
        case "-":
          input.value = operationValue - inputValue;
          break;
        case "%":
          input.value = (inputValue / 100) * operationValue;
          break;
        case "÷":
          if (inputValue === 0) {
            input.value = "Error";
            return;
          }
          input.value = operationValue / inputValue;
          break;
        case "x":
          input.value = operationValue * inputValue;
          break;
        case "√":
          input.value = Math.sqrt(inputValue);
          break;
        default:
          input.value = inputValue;
          break;
      }
      operation = "";
      operationValue = 0;
      isNewInput = true;
    };
  
    numbers.forEach((item) => {
      item.addEventListener("click", () => {
        if (input.value === "0" || isNewInput) {
          input.value = item.innerText;
          isNewInput = false;
        } else {
          input.value += item.innerText;
        }
      });
    });
  
    notNumberButtons.forEach((item) => {
      const buttonValue = item.innerText;
      item.addEventListener("click", () => {
        const inputValue = Number(input.value);
  
        if (buttonValue === ".") {
          if (!input.value.includes(".")) {
            input.value += buttonValue;
          }
        }
  
        if (buttonValue === "ac") {
          input.value = "0";
          operationValue = 0;
          operation = "";
        }
  
        if (buttonValue === "+") {
          performOperation(inputValue, buttonValue);
        }
  
        if (buttonValue === "-") {
          if (!operationValue) {
            setFirstValue(buttonValue, inputValue);
            return;
          }
          performOperation(inputValue, buttonValue);
        }
  
        if (buttonValue === "%") {
          operationValue = inputValue;
          input.value = "";
          operation = "%";
        }
  
        if (buttonValue === "÷") {
          if (!operationValue) {
            setFirstValue(buttonValue, inputValue);
            return;
          }
  
          if (inputValue === 0) {
            input.value = "Error";
            return;
          }
  
          performOperation(inputValue, buttonValue);
        }
  
        if (buttonValue === "x") {
          if (!operationValue) {
            setFirstValue(buttonValue, inputValue);
            return;
          }
          performOperation(inputValue, buttonValue);
        }
  
        if (buttonValue === "√") {
          input.value = Math.sqrt(Math.abs(inputValue));
        }
  
        if (buttonValue === "+/-") {
          input.value = inputValue * -1;
        }
  
        if (buttonValue === "=") {
          if (operation) {
            setResultValue(inputValue, operation);
          }
        }
      });
    });
  });
  