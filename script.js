let turn = 0;
let somebodyWon = false; 
(function () {
    for(let i = 0 ; i< 9; i++){
        let board = document.createElement("div");
        board.setAttribute("class","board-slot");
        board.setAttribute("data-index",i);
        document.getElementById("board").appendChild(board);
    }
  })();


class player {
    constructor(playerSign){
        this.playerSign = playerSign;
    }
    

    play(array,index){  
        array[index] = this.playerSign;
    }

    winner(){
        let playerName = this.playerSign + "-point";
        document.getElementById(playerName).innerHTML = parseInt(document.getElementById(playerName).innerHTML) +1;
    }


}


function cleanBoard(){
    turn = 0;
    somebodyWon = false;
    for(let i=0 ; i< game.tiles.length ; i++){
        document.getElementsByClassName("board-slot")[i].innerHTML = "";
        game.tiles[i] = "";
    }


}
function resetGame(){
    location.reload();
    return false;
}


let game = (function() {
    const tiles = new Array(9);
    let player1 = new player("x");
    let player2 = new player("o");

    for(let i = 0 ; i < tiles.length ; i++){
        document.getElementsByClassName("board-slot")[i].addEventListener("click", function(){
            if (turn%2 === 0){
                player1.play(tiles,i);
                winCheck(player1,tiles,i);
            }
            else{
                player2.play(tiles,i);
                winCheck(player2,tiles,i);
            }
            turn +=  1;
            if(this.innerHTML === ""){
                this.innerHTML = tiles[i];
            }          
            

           
        })
    }
    return {
        tiles : tiles,
        turn : turn
      };
  })();


function winCheck(player,tileArray,tileNumber){

// Checking if there are wins by columns.
    let firstRow = tileNumber;

    for( let i = 0 ; i < tileArray.length/3 ; i++){
        if(firstRow > 2){
            firstRow = firstRow - 3 ;
        }
        else{
            break;
        }
    }

    if(tileArray[firstRow] === tileArray[firstRow +3] && tileArray[firstRow+3] === tileArray[firstRow +6]){
                somebodyWon = true;
                alert(tileArray[firstRow] + " " + "win!");
                player.winner();    
    }
    

//Checking if there are wins by rows.
    let firstColumn = tileNumber;


    for(let i = 0 ; i < 3 ; i++){
        if( firstColumn === 6 || firstColumn === 3 || firstColumn === 0){
            break;

        }
        else{
            firstColumn -= 1;
        }
    }

    if(tileArray[firstColumn] !== undefined && tileArray[firstColumn + 1 ] !== undefined && tileArray[firstColumn + 2 ] !== undefined ){
        if(tileArray[firstColumn] === tileArray[firstColumn +1]){
            if(tileArray[firstColumn +1] === tileArray[firstColumn +2]){
                somebodyWon = true;
                alert(tileArray[firstColumn] + " " + "win!");
                player.winner();
            }        
        }
    }
//Checking if there are diagonal wins.
    if (tileNumber === 0 || tileNumber === 4 || tileNumber === 8){
        if(tileArray[0] === tileArray[4] && tileArray[4] === tileArray[8]){
            alert(tileArray[tileNumber] + " win!");
            somebodyWon = true;
            player.winner();
        }
    }

    if (tileNumber === 2 || tileNumber === 4 || tileNumber === 6)
    {
        if(tileArray[2] === tileArray[4] && tileArray[4] === tileArray[6]){
            alert(tileArray[tileNumber] + " win!");
            somebodyWon = true;
            player.winner();
        }   
    }

//draw condition
    if(turn === 8){
        alert("nobody won,draw.");
        somebodyWon = true;
    }



}



