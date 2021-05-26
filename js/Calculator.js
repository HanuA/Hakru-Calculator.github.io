class Calculator{
  buttons = null;
  result = null;
  evalButton = null;

  lastNum = 0;

  constructor({ buttonClass, resultId, evalId }){
    this.buttons = document.getElementsByClassName(buttonClass);
    this.result = document.getElementById(resultId);
    this.evalButton = document.getElementById(evalId);

    this.setupButtons();
    this.setupEvalButton();
  }

  calculateResult(e){
    let equation = this.result.value;

    const geoFunctionsRegex = /(sin|cos|tan|cotan)\s*\((-*\d*\.?\d*)\)/g;
    equation = equation.replace(geoFunctionsRegex, 'Math.$1($2)');

    const absoluteFunctionRegex = /\|(\-?\d\.?\d*)\|/g;
    equation = equation.replace(absoluteFunctionRegex, 'Math.abs($1)');

    const powerFunctionRegex = /(\-?\d*\.?\d*)\^(\-?\d*\.?\d*)/g;
    equation = equation.replace(powerFunctionRegex, 'Math.pow($1, $2)');

    const sqrtFunctionRegex = /√\s*\((\-?\d*\.?\d*)\)/g;
    equation = equation.replace(sqrtFunctionRegex, 'Math.sqrt($1)');

    const divideRegex = /÷/g;
    equation = equation.replace(divideRegex, '/');

    const multiplyRegex = /×/g;
    equation = equation.replace(multiplyRegex, '*');

    try{
      this.result.value = this.lastNum = eval(equation).toString();
    } catch (e){
      this.result.value = 'Error';
      this.lastNum = null;
    }
  }

  setupEvalButton(){
    this.evalButton.onclick = (e) => this.calculateResult(e);
  }

  setupButtons(){
    for (let i = 0; i < this.buttons.length; i++){
        this.buttons[i].onclick = (e) => {
            if(this.lastNum == null){
                this.result.value = '';
                this.lastNum = 0;
            }

            let x = e.target;
            let lastAdded = this.result.value.charAt(this.result.value.length-1);
            switch (x.innerHTML) {
                case "|x|":
                    if (this.lastNum == 0) {
                        break;
                    }
                    else {
                        this.result.value = this.result.value.slice(0, this.result.value.length - this.lastNum.length);
                        this.result.value += (x.innerHTML.slice(0, x.innerHTML.length - 2) + this.lastNum + "|");

                        this.lastNum = 0;
                    }
                    break;
                case "sin (x)": case "cos (x)": case "tan (x)": case "cotan (x)": case "√ (x)":
                    if (this.lastNum == 0) {
                        break;
                    }
                    else {
                        this.result.value = this.result.value.slice(0, this.result.value.length - this.lastNum.length);
                        this.result.value += (x.innerHTML.slice(0, x.innerHTML.length - 2) + this.lastNum + ")");

                        this.lastNum = 0;
                    }
                    break;
                case "¹/ₓ":
                    if (this.lastNum == 0) {
                        break;
                    }
                    else {
                        this.result.value = this.result.value.slice(0, this.result.value.length - this.lastNum.length);
                        this.result.value += "1/" + this.lastNum;

                        this.lastNum = 0;
                    }
                    break;
                case "⁺/₋":
                    if (this.lastNum == 0) {
                        break;
                    }
                    else {
                        this.result.value = this.result.value.slice(0, this.result.value.length - this.lastNum.length);
                        this.result.value += "-" + this.lastNum;
                    }
                    break;
                case "^": case ".":
                    if (lastAdded == "" || lastAdded == "=" || lastAdded == "^" || lastAdded == "." ){
                        break;
                    }
                    if (lastAdded == "|") {
                        if (x.innerHTML == ".") {
                            break;
                        }
                    }
                    else{
                        this.result.value += (x.innerHTML);
                        break;
                    }
                case "+": case "-": case "×": case "÷":
                    if (lastAdded == "" || lastAdded == "×" || lastAdded == "÷" || lastAdded == "^" || lastAdded == "." || lastAdded == "+" || lastAdded == "-"){
                        break;
                    }
                    else{
                        this.result.value += (x.innerHTML);
                        this.lastNum = 0;
                        break;
                    }
                case "C":
                    this.result.value = "";
                    this.lastNum = 0;
                    break;
                case "": case '<i class="fas fa-backspace"></i>':
                    this.result.value = this.result.value.slice(0, this.result.value.length - 1);
                    if (this.lastNum == 0) {
                        break;
                    }
                    else{
                        this.lastNum = this.lastNum.slice(0, this.lastNum.length - 1);
                    }
                    break;
                case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                    if (this.lastNum == 0) {
                        this.lastNum = (x.innerHTML);
                    }
                    else{
                        this.lastNum += (x.innerHTML);
                    }
                    this.result.value += (x.innerHTML);
                    break;
                default:
                    this.result.value += (x.innerHTML);
                    break;
            }
        }
    }
  }
}
