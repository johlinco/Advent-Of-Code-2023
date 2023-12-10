const fs = require("fs");
const { start } = require("repl");

const input = fs.readFileSync("day-nine/input.txt", "utf8");
const example = fs.readFileSync("day-nine/example.txt", "utf8");


function sumOfRowEndCalcs(data) {
    let sum = 0
    let lines = data.split(/\r?\n/)

    for (const line of lines) {
        let arrayHolder = []
        let array = []
        let str = ""

        for (let i = 0; i < line.length; i++) {
            if (line[i] === " ") {
                array.push(parseInt(str))
                str = ""
            } else  {
                str = str + line[i] 
            }
        }
        array.push(parseInt(str))
        arrayHolder.push(array)

        let startingArray = arrayHolder[0]

        while (startingArray.length) {
            
            let diffArray = []
            let zeroCount = 0
    
            for (let i = 1; i < startingArray.length; i++) {
                diffArray.push(startingArray[i] - startingArray[i-1])
                if (startingArray[i] - startingArray[i-1] === 0) zeroCount++
            }
            arrayHolder.push(diffArray)
            startingArray = diffArray
            if (zeroCount === diffArray.length) {
                break
            }
        }

        for (let i = arrayHolder.length-2; i >= 0; i--) {
            let bottomRow = arrayHolder[i+1]
            let bottomRowIndex = bottomRow.length-1
            let topRow = arrayHolder[i]
            let topRowIndex = topRow.length-1
    

            let lastNum = topRow[topRowIndex] + bottomRow[bottomRowIndex]

            arrayHolder[i].push(lastNum)
        }

        sum += arrayHolder[0][arrayHolder[0].length-1]
    }

    return sum
}

function extrapolateBackward(data) {
    let sum = 0
    let lines = data.split(/\r?\n/)

    for (const line of lines) {
        let arrayHolder = []
        let array = []
        let str = ""

        for (let i = 0; i < line.length; i++) {
            if (line[i] === " ") {
                array.push(parseInt(str))
                str = ""
            } else  {
                str = str + line[i] 
            }
        }
        array.push(parseInt(str))
        arrayHolder.push(array)

        let startingArray = arrayHolder[0]

        while (startingArray.length) {
            
            let diffArray = []
            let zeroCount = 0
    
            for (let i = 1; i < startingArray.length; i++) {
                diffArray.push(startingArray[i] - startingArray[i-1])
                if (startingArray[i] - startingArray[i-1] === 0) zeroCount++
            }
            arrayHolder.push(diffArray)
            startingArray = diffArray
            if (zeroCount === diffArray.length) {
                break
            }
        }

        for (let i = arrayHolder.length-3; i >= 0; i--) {
            let bottomRow = arrayHolder[i+1]
            let topRow = arrayHolder[i]
            let newNum = topRow[0] - bottomRow[0]


            arrayHolder[i].unshift(newNum)
        }
        sum += arrayHolder[0][0]
    }

    return sum
}

console.log(sumOfRowEndCalcs(example));
console.log(sumOfRowEndCalcs(input));

console.log(extrapolateBackward(example))
console.log(extrapolateBackward(input))