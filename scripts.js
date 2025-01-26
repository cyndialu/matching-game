let numberOfFaces = 3;
let score = 0;
let hints = 5;
const theLeftSide = document.querySelector('#leftSide');
const theRightSide = document.querySelector('#rightSide');
const startButton = document.getElementById('btnStart');
const endButton = document.getElementById('btnEnd');
const introDiv = document.querySelector('.instruction');

startButton.addEventListener('click', () => {
    hintButton.disabled = false;
    generateFaces();
});  

endButton.addEventListener('click', () =>{
    gameOver();
    startButton.disabled = false;
    endButton.disabled = true;
});
            
function generateFaces(){
    introDiv.style.display = 'none';
    document.querySelector('#score').innerHTML = score;
    for(let i=0; i<numberOfFaces; i++){
        const face = document.createElement('img');
        face.src = 'images/smile.png';
        const randomTop = Math.floor(Math.random()*400);
        const randomLeft = Math.floor(Math.random()*400);
        face.style.top = randomTop + "px";
        face.style.left = randomLeft  + "px";

        face.addEventListener('click',(e) => {
            if(e.target === e.target.parentElement.lastChild){
                nextLevel();
            }else{
                gameOver();
            }
        });
        theLeftSide.appendChild(face);
        startButton.disabled = true;
        endButton.disabled = false;
    }
    const leftSideImages = theLeftSide.cloneNode(true);
    leftSideImages.removeChild(leftSideImages.lastChild);
    leftSideImages.id = "cloneLeftSide";
    theRightSide.appendChild(leftSideImages);
}

function nextLevel(){
    numberOfFaces +=1;
    score +=1;
    document.querySelector('#score').innerHTML = score;
    while (theLeftSide.firstChild) {
        theLeftSide.removeChild(theLeftSide.firstChild);
    }
    while (theRightSide.firstChild) {
        theRightSide.removeChild(theRightSide.firstChild);
    }
    generateFaces();
}
            
function gameOver(){
    alert("Sorry! Game Over!");
    const imgToRemove = theLeftSide.getElementsByTagName('img');
    while (imgToRemove.length > 0) {
        imgToRemove[0].remove();
    }
    introDiv.style.display = 'block';
    theRightSide.innerHTML = '';
    score = 0;
    document.querySelector('#score').innerHTML = score;
    startButton.disabled = false;
    endButton.disabled = true;
    hintButton.disabled = true;
}

const hintButton = document.getElementById('btnHint');
hintButton.addEventListener('click', function(){
    alert(`You have ${hints} hint(s).`);
    theLeftSide.lastChild.style.opacity = 0.2;
    hints-=1;
    if(hints===0){
        hintButton.disabled = true;
        return;
    }
});