let gameBoard = [
    '','','',
    '','','',
    '','',''
]
let winConditions = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6],
    [1,4,7], [2,5,8], [0,4,8], [6,4,2]]

let players = [];

let currentPlayer = 0;
let round = 0;
let playing = true;

function player(name, marker) {
    this.name = name
    this.marker = marker
}

function gamePlay(){ // take inputs and change gameBoard
    if (playing === true){
        choice = this.id;
        if (gameBoard[choice] === ''){
            gameBoard[choice] = players[currentPlayer].marker;
            round++;
            whoWins();
            if (currentPlayer === 0){
                currentPlayer = 1;
            }
            else {
                currentPlayer = 0;
            }
            render();
        }
    }
}
function render(){ //fill in the board
    const playerDisplay = document.getElementById('currentPlayer');
    const markerDisplay = document.getElementById('currentMarker');
    for (let i = 0; i < 9; i++){
        let cell = document.getElementById(i);
        cell.innerHTML = gameBoard[i];
    }
    playerDisplay.innerHTML = players[currentPlayer].name;
    markerDisplay.innerHTML = players[currentPlayer].marker;
}

function newGame(){ //resets game
    for (let i = 0; i < 9; i++){
        gameBoard[i] = ''}
    round = 0;
    playing = true;
    render();

}

function newPlayers(){
    let playerOne  = prompt("What is player ones name?", 'Player One');
    if (playerOne === null){
        playerOne = 'Player One';
    } 
    players.push(new player(playerOne, 'X'));
    let playerTwo = prompt("What is player twos name?", 'Player Two');
    if (playerTwo === null){
        playerTwo = 'Player Two';
    }
    players.push(new player(playerTwo, 'O'));
    newGame();
}   

function whoWins(){ // check who wins the game
    for(var i = 0; i < winConditions.length; i++) { 
        var sum = 0;
        var w = winConditions[i];
        for(var b = 0; b < w.length; b++) {
            if(gameBoard[w[b]] === players[currentPlayer].marker) {
                sum++;
            }
        }
      
        if(sum === 3) {
            alert(`And the winner is ${players[currentPlayer].name}`);
            playing = false;
        }
        else if (round === 9){
            alert("and its a draw!");
            playing = false;
        }
    }
}

let choice = document.querySelectorAll('td');
choice.forEach( cell => cell.addEventListener('click', gamePlay))

let restart = document.getElementById('newGame');
restart.addEventListener('click', newGame);

let resetPlayers = document.getElementById('newPlayers');
resetPlayers.addEventListener('click', newPlayers)

newPlayers();
