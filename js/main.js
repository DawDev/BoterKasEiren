// get board as an array rather than a nodelist
const board = [...document.querySelectorAll('.tile')]; 
const xChar = '✖';
const oChar = '◉';

// Set a mouseclick EventListener on for everytile
board.forEach(t => {
    t.addEventListener('click', setTile);
});


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

function getFreeTiles() {
    let freeTiles = [];
    board.forEach(t => {
        if ( t.innerText == '' ) {
            freeTiles.push(t);
        }
    });
    return freeTiles;
}


function computerTurn() {
    // Get a "winning line" (or rather a set of tiles that if all of them are set to X, the player wins)
    // And check if the player can win in a single move 
    for (let i = 0; i < winConds.length; i++) {
        const wc = winConds[i];
        const line = [board[wc[0]].innerText, board[wc[1]].innerText, board[wc[2]].innerText];
        const sameCount = line.filter(x => x==xChar).length; // Check how many Xs there are in the said line
        // If there are 2 Xs in said line, put an O to block the player
        if ( sameCount == 2 ) {
            console.log(2)
            const ind = line.indexOf(''); // Get the index of the empty space
            setTileByIndex(wc[ind], oChar);
            break;
        } else {
            const freeTiles = getFreeTiles();
            const randomTile = freeTiles[Math.floor(Math.random() * freeTiles.length)]
            randomTile.innerText = oChar;
            break;
        }
    }
}





function checkWin() {
    winConds.forEach(winCondition => {
        const wc = winCondition;
        const t0 = board[wc[0]].innerText;
        const t1 = board[wc[1]].innerText; // Get value in each tile. Either X, O or ''
        const t2 = board[wc[2]].innerText;
        if ( t0 == t1 && t0 == t2 && t0 != '' ) {
            alert('WIN!');
        }
    });
}

function setTile(e) {
    const tile = e.target;
    if ( tile.innerText == '' ) {
        tile.innerText = xChar;
        checkWin();
        computerTurn();
    }
}

function setTileByIndex(ind, chr) {
    board[ind].innerText = chr;
}
