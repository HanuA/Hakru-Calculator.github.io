'use strict';
let result = document.getElementById("res");
setTimeout(function(){ 
    var x = document.getElementById("openedCalc");
    var y = document.getElementById("buttonCalc");
    x.style.display = "none";
    y.style.display = "grid";
    result.value = "";
}, 1500);
let button = document.getElementsByClassName('btn');
let lastNum = 0;
for (let i = 0; i < button.length; i++){
    button[i].onclick = function(e) {
        let x = e.target;
        let lastAdded = result.value.charAt(result.value.length-1);
        console.log(lastNum)
        switch (x.innerHTML) {
            case "| x |":
                result.value += "|" + lastNum + "|";
                lastNum = 0;
                break;
            case "sin(x)": case "cos(x)": case "tan(x)": case "cotan (x)":

                lastNum = 0;
                break;
            case "¹/ₓ":

                lastNum = 0;
                break;
            case "√(x)":
                lastNum = 0;
                break;
            case "=": case "^": case ".":
                if (lastAdded == "" || lastAdded == "=" || lastAdded == "^" || lastAdded == "." ){
                    break;
                }
                if (lastAdded == "=") {
                    lastNum = 0;
                }
                else{
                    result.value += (x.innerHTML);
                    break;
                }
            case "+":
            case "-":
                if (lastAdded == "=" || lastAdded == "." ){
                    break;
                }
                else{
                    result.value += (x.innerHTML);
                    break;
                }
            case "×":
            case "÷":
                if (lastAdded == "×" || lastAdded == "÷" || lastAdded == "^" || lastAdded == "." || lastAdded == "+" || lastAdded == "-"){
                    break;
                }
                else{
                    result.value += (x.innerHTML);
                    lastNum = 0;
                    break;
                }
            case "C":
                result.value = "";
                lastNum = 0;
                break;
            case "": case '<i class="fas fa-backspace"></i>':
                result.value = result.value.slice(0, result.value.length - 1);
                break;
            case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                if (lastNum == 0) {
                    lastNum = (x.innerHTML);
                }
                else{
                    lastNum += (x.innerHTML);
                }
                result.value += (x.innerHTML);
                break;
            default:
                result.value += (x.innerHTML);
                console.log("tf")
                break;
        }
    }
}
