const cells = Array.from(document.getElementsByClassName('cell'));
console.log(cells)



cells.forEach(cell => cell.addEventListener('click', check))


const gameBoard = (() => {
    let arr = new Array(9).fill(0);
    return {arr};
})();

if (!gameBoard.arr[1]) console.log(false)


function check(){
    console.log(this.getAttribute('data-key'));
    let key = this.getAttribute('data-key');
    if (!gameBoard.arr[key-1]){
         // gameFlow.mark()
        // gameFlow.checkWin()
    }
}




