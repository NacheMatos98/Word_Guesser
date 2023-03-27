

const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const dica = document.querySelector(".dica span");
const typingInput = document.querySelector(".typing-input");
const letraErradas = document.querySelector(".letrasE span")
const tentativas = document.querySelector(".tentativas span")
let word;
let incorrects = [];
let corrects = [];
let maximo


function randomWord() {
    //Pegando objeto randomico de wordList
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)];

    maximo = 8;
    corrects = [];
    incorrects = [];


    //Pegando palavra de objeto randomico
    word = randomObj.word;
    let hint = randomObj.hint;
    console.log(word);

    dica.innerHTML = hint;
    tentativas.innerHTML = maximo;
    letraErradas.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;

}



randomWord();



function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
        console.log(key);

        if (word.includes(key)) {

            for (let i = 0; i < word.length; i++) {

                console.log(word[i]);

                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }
        else {
            maximo--;
            incorrects.push(` ${key}`);
        }
        tentativas.innerHTML = maximo;
        letraErradas.innerText = incorrects;

    }
    typingInput.value = "";

    setTimeout(() => {
        if (corrects.length === word.length) {
            alert(`Parabéns!!! Você achou a palavra: ${word.toUpperCase()}`);
            randomWord();
        }
        else if (maximo < 1) {
            alert("FIM DE JOGO!!!");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    });
}



resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("keydown", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());