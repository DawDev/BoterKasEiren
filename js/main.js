const playButton = document.querySelector('.start-button');
const startScreen = document.querySelector('.start-screen-wrapper');
const gameScreen = document.querySelector('.game-wrapper');
// get board as an array rather than a nodelist
const board = [...document.querySelectorAll('.tile')]; 

// Player 'icons'
const xChar = '✖';
const oChar = '◉';

let turn = 0;

let won = false;


// Set a mouseclick EventListener on for everytile
board.forEach(t => {

    t.addEventListener('click', setTile);

});

// Roll up on click
playButton.addEventListener('click', () => {

    startScreen.classList.add('roll-up');
    
});

// Show the game screen when rolled up
startScreen.addEventListener('animationend', () => {

    startScreen.style.display = 'none';
    
    gameScreen.classList.add('fade-in');

});

// win conditions
const winConds = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], // Vertical ^
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Horizontal ^
    [0, 4, 8], 
    [2, 4, 6]  
];


function checkWin() {
    winConds.forEach(winCondition => {

        const wc = winCondition;
        const t0 = board[wc[0]].innerText;
        const t1 = board[wc[1]].innerText; // Get value in each tile. Either X, O or ''
        const t2 = board[wc[2]].innerText;

        if ( t0 == t1 && t0 == t2 && t0 != '' ) {
            won = true;
            board[wc[0]].classList.add('win');
            board[wc[1]].classList.add('win');
            board[wc[2]].classList.add('win');
        }

    });
}

function setTile(e) {
    if ( !won ) {

        const tile = e.target;
        if ( tile.innerText == '' ) {
    
            if ( turn % 2 == 0 )
                tile.innerText = xChar;
            else 
                tile.innerText = oChar;
            turn++;
            checkWin();
        }

    }

}

