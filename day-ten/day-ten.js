const fs = require("fs");

const input = fs.readFileSync("day-nine/input.txt", "utf8");
const example = fs.readFileSync("day-nine/example.txt", "utf8");

let canMoveNorthTo = new Set(["|", "S", "F", "7"])
let canMoveSouthTo = new Set(["|", "S", "L", "J"])
let canMoveEastTo = new Set(["-", "S", "7", "J"])
let canMoveWestTo = new Set(["-", "S", "F", "L"])

let directions = [[-1,0, canMoveNorthTo, "up"], [0, 1, canMoveEastTo, "right"], [1,0, canMoveSouthTo, "down"], [0,-1, canMoveWestTo, "left"]]

let prevDirCurrNext = {
    "|" : {
        "up" : {
            "F" : [0, 1, "right"],
            "7" : [0, -1, "left"],
            "|" : [-1, 0, "up"]
        },
        "down" : {
            "L" : [0, 1, "right"],
            "J" : [0, -1, "left"],
            "|" : [1, 0, "down"]
        },
    },
    "-" : {
        "right" : {
            "7" : [1, 0, "down"],
            "J" : [-1, 0, "up"],
            "-" : [0, 1, "right"],
        },
        "left" : {
            "L" : [-1, 0, "up"],
            "F" : [1, 0, "down"],
            "-" : [0, -1, "left"]
        },
    },
    "L" : {
        "up" : {
            "|" : [-1, 0, "up"],
            "F" : [0, 1, "right"],
            "7" : [0, -1, "left"],
        },
        "right" : {
            "-" : [0, 1, "right"],
            "J" : [-1, 0, "up"],
            "7" : [1, 0, "down"],
        },    
    },
    "F" : {
        "down" : {
            "|" : [1, 0, "down"],
            "L" : [0, 1, "right"],
            "J" : [0, -1, "left"],
        },
        "right" : {
            "-" : [0, 1, "right"],
            "7" : [1, 0, "down"],
            "J" : [-1, 0, "up"],
        },
    },
    "7" : {
        "left" : {
            "-" : [0, -1, "left"],
            "F" : [1, 0, "down"],
            "L" : [-1, 0, "up"]
        },
        "down" : {
            "L" : [0, 1, "right"],
            "|" : [1, 0, "down"],
            "J" : [0, -1, "left"]
        },
    },
    "J" : {
        "left" : {
            "-" : [0, -1, "left"],
            "L" : [-1, 0, "up"],
            "F" : [1, 0, "down"],
        },
        "up" : {
            "|" : [-1, 0, "up"],
            "F" : [0, 1, "right"],
            "7" : [0, -1, "left"],
        },
    },
    "S" : {
        "up" : {
            "|" : [-1, 0, "up"],
            "F" : [0, 1, "right"],
            "7" : [0, -1, "left"],
        },
        "down" : {
            "|" : [1, 0, "down"],
            "J" : [0, -1, "left"],
            "L" : [0, 1, "right"],
        },
        "left" : {
            "-" : [0, -1, "left"],
            "L" : [-1, 0, "up"],
            "F" : [1, 0, "down"],
        },
        "right" : {
            "-" : [0, 1, "right"],
            "7" : [1, 0, "down"],
            "J" : [-1, 0, "up"],
        },
    },
}

function loopLength(data) {
    let matrix = [];
    let startRow
    let startCol
    let prevRow
    let prevCol
    let prevTile
    let currRow
    let currCol
    let currDir
    let nextRow
    let nextCol
    let steps = 0
    let lines = data.split(/\r?\n/)

    for (let i = 0; i < lines.length; i++)  {
        let array = []
        for (let j = 0; j < lines[i].length; j++) {
            array.push(lines[i][j])
            if (lines[i][j] === "S") {
                startRow = i
                startCol = j
            }
        }
        matrix.push(array)
    }

    for (const dir of directions) {
        if (startRow+dir[0] >= 0 && startRow+dir[0] < matrix[0].length && startCol+dir[1] >=0 && startCol+dir[1] < matrix.length) {
            currTile = matrix[startRow+dir[0]][startCol+dir[1]]
            currRow = startRow+dir[0]
            currCol = startCol+dir[1]
            if (dir[2].has(matrix[currRow][currCol]))  {
                prevRow = startRow
                prevCol = startCol
                currTile = matrix[currRow][currCol]
                prevTile = matrix[prevRow][prevCol]
                currDir = dir[3]
                break
            }
        }
    }
    steps++

    while (currRow !== startRow || currCol !== startCol) {
        steps++
        let nextMove = prevDirCurrNext[prevTile][currDir][currTile]
        nextRow = currRow + nextMove[0]
        nextCol = currCol + nextMove[1]

        prevTile = currTile
        currDir = nextMove[2]
        currRow = nextRow
        currCol = nextCol
        currTile = matrix[currRow][currCol]
    }

    return steps/2
}

console.log(loopLength(example));
console.log(loopLength(input));