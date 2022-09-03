const cells = Array.from(document.getElementsByClassName('cell'));
console.log(cells)
let modal = document.querySelector('.modal')
let result = document.getElementById('result');
let playerX = document.querySelector('.player-x');
let playerO = document.querySelector('.player-o');


modal.addEventListener('click', () => {
    modal.style.display = 'none';
    // reset()
})
cells.forEach(cell => cell.addEventListener('click', check))



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

    const checkWin = (arr, mark) => {
        if (arr.length >= 3){
            for (let idx=0; idx < arr.length; idx++){
            let i = idx+1;
            let j = arr.length - 1;
            while (j > i){
                if (arr[j] - arr[i] === arr[i] - arr[idx]){
                    if (mark === 'x') result.textContent = "X";
                    else result.textContent = "O";
                    modal.style.display = 'flex';
                    return;
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
    // const reset = () => {}
    return {marker, checkWin}
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
        gameBoard.arr[key-1] = 1;
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

    }
}







