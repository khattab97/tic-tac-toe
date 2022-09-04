const cells = Array.from(document.getElementsByClassName('cell'));
console.log(cells)
let modal = document.querySelector('.modal')
let result = document.getElementById('result');
let playerX = document.querySelector('.player-x');
let playerO = document.querySelector('.player-o');
let images = [];
let restart = document.querySelector('button');


modal.addEventListener('click', () => {
    modal.style.display = 'none';
    gameFlow.reset();
})
cells.forEach(cell => cell.addEventListener('click', check))
restart.addEventListener('click', () => gameFlow.reset())


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
        images.push(image);
    }

    const checkWin = (arr, mark) => {
        if (arr.length >= 3){
            arr.sort((a, b) => a - b);
            for (let idx=0; idx < arr.length; idx++){
                let i = idx+1;
                let j = arr.length - 1;
                while (j > i){
                    if (arr[j] - arr[i] === arr[i] - arr[idx]){
                        if (arr[j] - arr[i] === 2 && (arr[idx] !== "3" || arr[i] !== "5" || arr[j] !== "7")){
                            i++;
                            j = arr.length - 1;
                        } else {
                            if (mark === 'x') result.textContent = "X";
                            else result.textContent = "O";
                            modal.style.display = 'flex';
                            return;
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
    }

    const reset = () => {
        images.forEach(image => {
            image.remove();
            playerOne.playHistory = [];
            playerTwo.playHistory = [];
            gameBoard.arr = [];
        })
    }
    return {marker, checkWin, reset}
})();


const gameBoard = (() => {
    let arr = new Array(9).fill(0);
    return {arr};
})();

if (!gameBoard.arr[1]) console.log(false)


function check(e){
    console.log(this.getAttribute('data-key'));
    let key = this.getAttribute('data-key');
    if (!gameBoard.arr.includes(key)){
        gameBoard.arr.push(key);
        console.log(playerX.classList.contains('player-active'));
        if (playerX.classList.contains('player-active')){
            gameFlow.marker(playerOne.mark, this);
            playerOne.playHistory.push(key);
            gameFlow.checkWin(playerOne.playHistory, playerOne.mark)
        } else {
            gameFlow.marker(playerTwo.mark, this);
            playerTwo.playHistory.push(key);
            gameFlow.checkWin(playerTwo.playHistory, playerTwo.mark)
        }
        playerX.classList.toggle('player-active');
        playerO.classList.toggle('player-active');

    }
}







