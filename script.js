const cells = Array.from(document.getElementsByClassName('cell'));
console.log(cells)
let modal = document.querySelector('.modal')
let winnerSign = document.getElementById('winner-sign');
let playerX = document.querySelector('.player-x');
let playerO = document.querySelector('.player-o');



cells.forEach(cell => cell.addEventListener('click', check))
window.onclick = function(event) {
    modal.style.display = "none";
    // add reset to the game board
}


const Player = (name, mark) => {
    const playHistory = [];
    return {name, mark, playHistory};
}
let playerOne = Player('x', 'x');
let playerTwo = Player('o', 'o');


const gameFlow = (() => {
    const marker = (mark, div) => {
        let image = new Image();
        if (mark === 'x') image.src = "./images/x.jpg";
        else image.src = "./images/o.jpg";
        div.appendChild(image);
    }
    return {marker}
})();


const gameBoard = (() => {
    let arr = new Array(9).fill(0);
    return {arr};
})();

if (!gameBoard.arr[1]) console.log(false)


function check(e){
    console.log(this.getAttribute('data-key'));
    let key = this.getAttribute('data-key');
    if (!gameBoard.arr[key-1]){
        console.log(playerX.classList.contains('player-active'));
        if (playerX.classList.contains('player-active')){
            gameFlow.marker(playerOne.mark, this);
            playerOne.arr.push(key);
            gameFlow.checkWin(playerOne.arr)
        } else {
            gameFlow.marker(playerTwo.mark, this);
            playerTwo.arr.push(key);
            gameFlow.checkWin(playerTwo.arr)
        }

    }
}







