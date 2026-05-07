// const { createElement } = require("react");

// const { log } = require("mathjs");


const button = document.querySelector('.settings');
const navigation = document.querySelector('.navigation');
const window = document.querySelector('.settings-window');
const calcContainer = document.querySelector('.background');
const header = document.querySelector('.settings-header');
const settingsBody = document.querySelector('.settings-content');
const calcBody = document.querySelector('.calc-body');
console.log(calcBody);



//Getting the root element in CSS
const root = document.documentElement;

const Theme = JSON.parse(localStorage.getItem('theme')) ||  'Dark';
applyTheme(Theme);
//SettingsHeader
const settingName = document.createElement('h2');
settingName.classList.add('h2');
const closeButton = document.createElement('button');
closeButton.classList.add('closeButton');

header.appendChild(settingName);
header.appendChild(closeButton);

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
    window.style.display = "flex";
    calcContainer.style.display = "none";
    if(target.dataset.taget == "history"){
        //There's an in built history() in js..
        // window.style.display = "flex";
        // calcContainer.style.display = "none";
        historyy();
    }
    else{
        theme();
    }
})

closeButton.addEventListener('click' , ()=>{
    window.style.display = "none";
    calcContainer.style.display = "flex";
})

function historyy(){
    setHeader('History');

    const data = getLocal();
    if(!data){
        settingsBody.innerHTML = `Couldn't Load History`;
    }
    else{
        settingsBody.innerHTML = "";
        console.log("Data Recieved");
        console.log(data);
        data.forEach((block) => {
            const div = document.createElement('div');
            div.setAttribute('class' , "history-blocks");
            div.innerHTML = 
            `   <h3>${block.expression}</h3>
                <p>${block.result}</p>
            `;

            settingsBody.appendChild(div);
        });
    }
}

function theme(){
    console.log("theme called");
    
    setHeader('Theme');
    settingsBody.innerHTML = "";
    const form = document.createElement('form');
    const submit = document.createElement('button');
    submit.classList.add('saveTheme');
    submit.textContent = "Save";
    
    //Creating Radio Buttons..
    
    const radioDark = createRadio("Dark");
    const radioLight = createRadio("Light");
    form.appendChild(radioDark);
    form.appendChild(radioLight);
    form.appendChild(submit);
    
    settingsBody.appendChild(form);

    submit.addEventListener('click' , (event) =>{
        event.preventDefault();
        const data = new FormData(form);
        const theme = data.get('theme');

        applyTheme(theme);
    })
}

function setHeader(headName){
    settingName.textContent = `${headName}`;
    closeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style="display:block"
    fill="white" class="close-svg">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5
    5 6.41 10.59 12 5 17.59 6.41 19
    12 13.41 17.59 19 19 17.59
    13.41 12 19 6.41z"/>
    </svg>
    `;

}

function getLocal(){
    console.log("Enter getLocal");
    
    const stringData = localStorage.getItem('history');
    if(stringData){
        return JSON.parse(stringData);
    }
    return null;
}

function createRadio(type){
    const radio = document.createElement('input');
    radio.setAttribute('type' , 'radio');
    radio.setAttribute('id' , `${type}`);
    radio.setAttribute('name' , 'theme');
    radio.setAttribute('value' , `${type}`);

    const label = document.createElement('label');
    label.setAttribute('for' , 'radio');
    label.innerHTML = `${type}`;

    const radioContainer = document.createElement('div');
    radioContainer.setAttribute('class' , 'radioCont');
    radioContainer.appendChild(radio);
    radioContainer.appendChild(label);

    // return {radio , label};
    return radioContainer;
}


function applyTheme(theme){
    console.log(theme);
    if(theme == "Light"){
        root.style.setProperty('--window-background' , `white`);
        root.style.setProperty('--settings-text' , 'black');
        root.style.setProperty('-calc-body' , 'black');
        calcBody.classList.add('addBorder');
        console.log("Executed");
    }
    else if(theme == "Dark"){
        root.style.setProperty('--window-background' , `black`);
        root.style.setProperty('--settings-text' , 'white');
        root.style.setProperty('-calc-body' , 'white');
        calcBody.classList.remove('addBorder');
    }
    else{
        alert("Please Select a Theme");
        return;
    }    

    localStorage.setItem('theme' , JSON.stringify(theme));
}