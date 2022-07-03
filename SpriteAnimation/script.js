let playerState = 'fall';
const dropdown = document.getElementById('animations')
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575; // 6876(total width) / 12 rows
const spriteHeight = 523; // 5230(total height) / 10 colums


let gameFrame = 0
const staggerFrames = 5; //slows down animation per frames
const spriteAnimtions = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'getHit',
        frames: 4
    },
]
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push( {x: positionX, y: positionY} )
    }
    spriteAnimtions[state.name] = frames;
})

console.log(spriteAnimtions);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimtions[playerState].loc.length //cycle through animations
    let frameX = spriteWidth * position
    let frameY = spriteAnimtions[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
 
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();