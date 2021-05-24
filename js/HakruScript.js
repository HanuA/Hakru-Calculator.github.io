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
let lastAdded = 0;
for (let i = 0; i < button.length; i++){
    button[i].onclick = function(e) {
        let x = e.target;
        switch (x.innerHTML) {
            case "| x |":
                result.value += (x.innerHTML + " ");
                break;
            case "sin()":
                result.value += (x.innerHTML + " ");
                break;
            case "cos()":
                result.value += (x.innerHTML + " ");
                break;
            case "tan()":
                result.value += (x.innerHTML + " ");
                break;
            case "cotan()":
                result.value += (x.innerHTML + " ");
                break;
            case "¹/ₓ":
                result.value += (x.innerHTML + " ");
                break;
            case "√":
                result.value += (x.innerHTML + " ");
                break;
            case "=":
                result.value += (x.innerHTML + " ");
                break;
            case "C":
                result.value = "";
                break;
            case "":
                result.value = result.value.slice(0, result.value.length - 1);
                break;
                         
            default:
                result.value += (x.innerHTML);
                break;
        }
    }
}