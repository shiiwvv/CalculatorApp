// import { math } from './node_modules/mathjs/lib/browser/math.js';
// import * as math from './node_modules/mathjs/lib/browser/math.js';
//They didn't work dont know why that's why i had to load it via html.

// const { log } = require("mathjs");

const buttons = document.querySelector('.calc-buttons');
const display = document.querySelector('.calc-display');
let p = document.createElement('p');
p.setAttribute('class' , 'display-font');
display.appendChild(p);


// let historyCalc = [];//For storing the history..
// //Storing the list in LocalStorage
// localStorage.setItem('history' , JSON.stringify(historyCalc));

/*This whole thing failed because, since everytime this Js file loads on the browser. All the previous stored data gets Overridden.. So to avoid that*/

let historyCalc = JSON.parse(localStorage.getItem('history')) || [];

const validInput = new Set([..."0123456789+-*/%."]);

const ops = {
    expression : "",
    bracketOpen : false 
}
// let expression = ""; 
// let bracketOpen = false;

buttons.addEventListener('click' , (event) =>{
    const eventTarget = event.target.closest('.buttons');
    const EnterValue = eventTarget.dataset.id;

    if(validInput.has(EnterValue)){
        ops.expression += EnterValue;
    }
    if(EnterValue == "()"){
        if(!ops.bracketOpen){
            ops.expression += "(";
            ops.bracketOpen = true;
        }
        else{
            ops.expression += ")";
            ops.bracketOpen = false;
        }
    }
    if(EnterValue == "BackSpace"){
        ops.expression = ops.expression.slice(0 , -1);
    }
    if(EnterValue == "AC"){
        ops.expression = "";
    }
    console.log(ops.expression);
    // display.innerHTML = `<p class="display-font">${ops.expression}</p>`;
    p.textContent = `${ops.expression}`;
    //Make the Screen stick with the last Digit, on the right..
    // p.scrollLeft += p.scrollWidth;
    /*This Also works but better apporach*/
    p.scrollLeft = p.scrollWidth - p.clientWidth;

    if(EnterValue == "="){
        performOperation(ops);
    }
})

function performOperation(ops){
    try{
        const exp = ops.expression;
        const result = math.evaluate(`${ops.expression}`) ;
        ops.expression = `${result}`;
        // display.innerHTML = `<p class="display-font">${result}</p>`;
        p.textContent = `${ops.expression}`;
        pushLocal(exp , result);
        resetValue(ops);
        console.log(result);
    }
    catch(err){
        // display.innerHTML = `<p class="display-font">Syntax Error </p>`;
        p.textContent = `Syntaax Error`;
        resetValue(ops);
    }
}

function pushLocal(expression , result){
    // const h1 = {expression : expression , result : result};
    //or
    const h1 = {expression , result};
    let retHistory = getLocal('history');
    if(retHistory != null){
        console.log(retHistory);
        retHistory.push(h1);
        localStorage.setItem('history' , JSON.stringify(retHistory));
        console.log("Saved To Local.");
    }
    else{
        console.log("Error.");
    }
}

function getLocal(key){
    const strHistory = localStorage.getItem(`${key}`);
    if(strHistory){
        return JSON.parse(strHistory);
    }
    else{
        return null;
    }
}

function resetValue(ops){
    // ops.expression = "";
    ops.bracketOpen = false;
}
