"use strict";

const boardSize = 4;

function GetBoard()
{
    this.matrix = [];

    this.UP = 0;
    this.DOWN = 1;
    this.LEFT = 2;
    this.RIGHT = 3;

    for(let i = 0; i < boardSize; i++)
    {
        let row = []
        for(let j = 0; j < boardSize; j++)
        {
            row.push(null);
        }
        this.matrix.push(row);
    }
}

GetBoard.prototype.init = function () {
    this.generateRandomTile();
    this.generateRandomTile();
}

GetBoard.prototype.move = function(direction) {
    let moved = false;

    if(direction == this.UP)
    {
        for(let i = 0; i < boardSize; i++)
        {
            for(let j = 0; j < boardSize; j++)
            {
                if(this.matrix[i][j] == null)
                    continue;

                let x = i - 1;
                let y = j;
                while(x >= 0 && this.matrix[x][y] == null)
                {
                    moved = true;
                    this.matrix[x][y] = this.matrix[x + 1][y];
                    this.matrix[x + 1][y] = null;
                    x--;
                }

                if(x < 0)
                    continue;

                if(this.matrix[x][y] != null && (x + 1) < boardSize && this.matrix[x + 1][y].value == this.matrix[x][y].value)
                {
                    moved = true;
                    this.matrix[x][y].value *= 2;
                    this.matrix[x][y].bgColor = tileColor[this.matrix[x][y].value];
                    this.matrix[x + 1][y] = null;
                }
            }
        }
    }
    else if(direction == this.DOWN)
    {
        for(let i = boardSize - 1; i >= 0; i--)
        {
            for(let j = 0; j < boardSize; j++)
            {
                if(this.matrix[i][j] == null)
                    continue;

                let x = i + 1;
                let y = j;
                while(x < boardSize && this.matrix[x][y] == null)
                {
                    moved = true;
                    this.matrix[x][y] = this.matrix[x - 1][y];
                    this.matrix[x - 1][y] = null;
                    x++;
                }

                if(x >= boardSize)
                    continue;

                if(this.matrix[x][y] != null && this.matrix[x][y].value == this.matrix[x - 1][y].value)
                {
                    moved = true;
                    this.matrix[x][y].value *= 2;
                    this.matrix[x][y].bgColor = tileColor[this.matrix[x][y].value];
                    this.matrix[x - 1][y] = null;
                }
            }
        }
    }
    else if(direction == this.LEFT)
    {
        for(let i = 0; i < boardSize; i++)
        {
            for(let j = 0; j < boardSize; j++)
            {
                if(this.matrix[i][j] == null)
                    continue;

                let x = i;
                let y = j - 1;
                while(y >= 0 && this.matrix[x][y] == null)
                {
                    moved = true;
                    this.matrix[x][y] = this.matrix[x][y + 1];
                    this.matrix[x][y + 1] = null;
                    y--;
                }

                if(y < 0)
                    continue;

                if(this.matrix[x][y] != null && this.matrix[x][y].value == this.matrix[x][y + 1].value)
                {
                    moved = true;
                    this.matrix[x][y].value *= 2;
                    this.matrix[x][y].bgColor = tileColor[this.matrix[x][y].value];
                    this.matrix[x][y + 1] = null;
                }
            }
        }
    }
    else if(direction == this.RIGHT)
    {
        for(let i = 0; i < boardSize; i++)
        {
            for(let j = boardSize - 1; j >= 0; j--)
            {
                if(this.matrix[i][j] == null)
                    continue;

                let x = i;
                let y = j + 1;
                while(y < boardSize && this.matrix[x][y] == null)
                {
                    moved = true;
                    this.matrix[x][y] = this.matrix[x][y - 1];
                    this.matrix[x][y - 1] = null;
                    y++;
                }

                if(y >= boardSize)
                    continue;

                if(this.matrix[x][y].value == this.matrix[x][y - 1].value)
                {
                    moved = true;
                    this.matrix[x][y].value *= 2;
                    this.matrix[x][y].bgColor = tileColor[this.matrix[x][y].value];
                    this.matrix[x][y - 1] = null;
                }
            }
        }
    }

    // add a new tile
    if(moved)
        this.generateRandomTile();
    // let tilePos = this.generateRandomTile();
    // this.matrix[tilePos[0]][tilePos[1]] = new Tile(2, tileColor[2]);
}

GetBoard.prototype._getFreeCells = function()
{
    let freeCells = [];
    for(let i = 0; i < boardSize; i++)
    {
        for(let j = 0; j < boardSize; j++)
        {
            if(this.matrix[i][j] == null)
            {
                freeCells.push([i, j]);
            }
        }
    }
    return freeCells;
}

GetBoard.prototype.generateRandomTile = function () {
    // generate random number for x and y which corresponds to a free cell
    let freeCells = this._getFreeCells();
    if(freeCells.length)
    {
        let pos = getRandomNumber(0, freeCells.length);

        let x = freeCells[pos][0];
        let y = freeCells[pos][1];

        this.matrix[x][y] = new Tile(2, tileColor[2]);
    }
}

GetBoard.prototype.toString = function() {
    for(let row of this.matrix)
    {
        let rowStr = "";
        for(let cell of row)
        {
            rowStr += cell + " ";
        }
        console.log(rowStr);
    }
}

function getRandomNumber(max, min)
{
    return Math.floor(Math.random() * (max - min)) + min;   
}