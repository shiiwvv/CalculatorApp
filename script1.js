// const { log } = require("mathjs");

const button = document.querySelector('.settings');
const navigation = document.querySelector('.navigation');
const window = document.querySelector('.settings-window');
const calcBody = document.querySelector('.background');


let navOpen = false;
button.addEventListener('click' , () =>{
    console.log("Button CLicked");
    
    if(!navOpen){
        navigation.classList.add('open');
        navOpen = true; 
    }
    else{
        navigation.classList.remove('open');
        navOpen = false; 
    }

})

navigation.addEventListener('click' , (event)=>{
    const target = event.target;
    console.log(target);
    if(target.dataset.taget == "history"){
        //There's an in built history() in js..
        window.style.display = "block";
        calcBody.style.display = "none";
        historyy();
    }
    else{
        theme();
    }
})

function historyy(){

}

function theme(){

}