const cells = Array.from(document.getElementsByClassName('cell'));
console.log(cells)
let modal = document.querySelector('.modal')
let result = document.getElementById('result');
let res = document.querySelector('.result');
let playerX = document.querySelector('.player-x');
let playerO = document.querySelector('.player-o');
let images = [];
let restart = document.querySelector('button');


modal.addEventListener('click', () => {
    modal.style.display = 'none';
    res.style.display = 'block';
    gameFlow.reset();
})
cells.forEach(cell => cell.addEventListener('click', check))
restart.addEventListener('click', () => gameFlow.reset())


function populateModal(mark){
    if (mark){
        if (mark === 'x') result.textContent = "X";
        else result.textContent = "O";
    } else {
        result.textContent = "Draw";
        res.style.display = 'none';
    }
    modal.style.display = 'flex';

}


const Player = (name, mark) => {
    const playHistory = [];
    return {name, mark, playHistory};
}


const gameFlow = (() => {
    const checkWin = (arr, mark) => {
        if (arr.length >= 3){
            arr.sort((a, b) => a - b);
            for (let idx=0; idx < arr.length; idx++){
                let i = idx+1;
                let j = arr.length - 1;
                while (j > i){
                    if (arr[j] - arr[i] === arr[i] - arr[idx]){
                        if ((arr[j] - arr[i] === 2 && (arr[idx]%3 !== 0 || arr[i]%3 !== 2 || arr[j]%3 !== 1))
                        || (arr[j] - arr[i] === 1 && (arr[idx]%3 !== 1 || arr[i]%3 !== 2 || arr[j]%3 !== 0))){
                            i++;
                            j = arr.length - 1;
                        } else {
                            populateModal(mark);
                            return
                        }
                    }
                    else if (arr[j] - arr[i] > arr[i] - arr[idx]) j--;
                    else {
                        i += 1;
                        j = arr.length - 1;
                    }
                }
            }
        }
    };

    const reset = () => {
        images.forEach(image => image.remove());
        gameBoard.playerTwo.playHistory = [];
        gameBoard.playerOne.playHistory = [];
        gameBoard.boardHistory = [];
    };
    return {checkWin, reset};
})();


const gameBoard = (() => {
    let boardHistory = [];
    let playerOne = Player('x', 'x');
    let playerTwo = Player('o', 'o');

    const updateGameboard = (player, div, key) => {
        marker(player.mark, div);
        player.playHistory.push(key);
        gameFlow.checkWin(player.playHistory, player.mark);
        playerX.classList.toggle('player-active');
        playerO.classList.toggle('player-active');
        // Check Draw
        if (gameBoard.boardHistory.length === 9 && modal.style.display === 'none') populateModal();
    };

    const marker = (mark, div) => {
        let image = new Image();
        if (mark === 'x') image.src = "./images/x.jpg";
        else image.src = "./images/o.jpg";
        div.appendChild(image);
        images.push(image);
    };
    return {boardHistory, playerOne, playerTwo, updateGameboard};
})();


function check(e){
    let key = +(this.getAttribute('data-key'));
    if (!gameBoard.boardHistory.includes(key)){
        gameBoard.boardHistory.push(key);
        if (playerX.classList.contains('player-active')) gameBoard.updateGameboard(gameBoard.playerOne, this, key);
        else gameBoard.updateGameboard(gameBoard.playerTwo, this, key);
    }
}







