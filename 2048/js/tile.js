"use strict";

function Tile(value, bgColor) 
{
    this.value = value;
    this.bgColor = bgColor; 
}

Tile.prototype.toString = function() {
    return String(this.value);
}

const tileColor = {
    "EMPTY CELL": "rgba(238, 228, 218, 0.35)",
    2: "#ffffff",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edcc61",
    1024: "#edcc61",
    2048: "#edcc61"
};

Object.freeze(tileColor);