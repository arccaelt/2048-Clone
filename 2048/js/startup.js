"use strict";

function generateBoard() {
    let tb = document.getElementById("board");

    for (let i = 0; i < boardSize; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < boardSize; j++) {
            let cell = document.createElement("td");
            cell.innerHTML = "";
            row.append(cell);
        }
        tb.append(row);
    }
}

function clearDisplay(tb)
{
    for(let row of tb.rows)
    {
        for(let cell of row.cells)
        {
            cell.innerHTML = "";
            cell.style["background-color"] = tileColor["EMPTY CELL"];
        }
    }
}

function displayBoard(board)
{
    let tb = document.getElementById("board");
    clearDisplay(tb);
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if(board.matrix[i][j] != null)
            {
                // put the new value
                tb.rows[i].cells[j].innerHTML = board.matrix[i][j].value;
                tb.rows[i].cells[j].style["background-color"] = board.matrix[i][j].bgColor;
            }
        }
    }
}

function addEventListners()
{
    document.body.onkeydown = function(event)
    {
        if(event.key == "ArrowUp")
        {
            board.move(board.UP);
        }
        else if(event.key == "ArrowRight")
        {
            board.move(board.RIGHT);
        }
        else if(event.key == "ArrowLeft")
        {
            board.move(board.LEFT);
        }
        else if(event.key == "ArrowDown")
        {
            board.move(board.DOWN);
        }
        displayBoard(board);
    };

    document.getElementById("new_game").onclick = function(){
        board = new GetBoard();
        board.init();
        displayBoard(board);
    };
}

var board = new GetBoard();
board.init();

generateBoard();
displayBoard(board);
addEventListners();