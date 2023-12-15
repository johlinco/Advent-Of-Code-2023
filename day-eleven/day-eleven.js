const fs = require("fs");

const input = fs.readFileSync("day-eleven/input.txt", "utf8");
const example = fs.readFileSync("day-eleven/example.txt", "utf8");

function starMapper(spaceImage) {
    let lines = spaceImage.split(/\r?\n/)

    let starterUniverse = []
    let colsToExpand = []
    // expand rows
    for (let i = 0; i < lines.length; i++) {
        let galaxyCount = 0
        let array = []
        for (let j = 0; j < lines[i].length; j++) {
            array.push(lines[i][j])
            if (lines[i][j] === "#") {
                galaxyCount++
            }
        }
        starterUniverse.push(array)
        if (galaxyCount === 0) {
            starterUniverse.push(array)
        }
    }
    //find cols to expand
    for (let i = 0; i < starterUniverse[0].length; i++) {
        let galaxyCount = 0
        for (let j = 0; j < starterUniverse.length; j++) {
            if (starterUniverse[j][i] === "#") {
                galaxyCount++
            }
        }
        if (galaxyCount === 0) {
           colsToExpand.push(i)
        }
    }
    // expand cols
    for (let j = colsToExpand.length-1; j >= 0; j--) {
        for (let row = 0; row < starterUniverse.length; row++) {
            let beginning = starterUniverse[row].slice(0, colsToExpand[j])
            let middle = ["."]
            let end = starterUniverse[row].slice(colsToExpand[j])
            starterUniverse[row] = beginning.concat(middle).concat(end)
        }
    }
    return starterUniverse
}

function findGalaxies(universe) {
    let galaxyArray = [];
    for (let i = 0; i < universe.length; i++) {
        for (let j = 0; j < universe[i].length; j++) {
            if (universe[i][j] === "#") {
                galaxyArray.push([i,j])
            }
        }
    }
    return galaxyArray
}

function distanceBetweenGalaxies(galaxy1, galaxy2) {
    let xTravel = Math.abs(galaxy1[1] - galaxy2[1])
    let yTravel = Math.abs(galaxy1[0] - galaxy2[0])

    return xTravel + yTravel

}

function distanceSum(spaceImage) {
    let sum = 0
    const expandedUniverse = starMapper(spaceImage)
    const galaxyList = findGalaxies(expandedUniverse)

    for (let i = 0; i < galaxyList.length-1; i++) {
        for (let j = i+1; j < galaxyList.length; j++) {
            sum += distanceBetweenGalaxies(galaxyList[i], galaxyList[j])
        }
    }
    return sum
}

console.log(distanceSum(example))
console.log(distanceSum(input))

function bigSpaceMapper(spaceImage) {
    let lines = spaceImage.split(/\r?\n/)
    let universe = []

    for (const line of lines) {
        universe.push(line.split(""))
    }
    return universe
}

function universeSizeKeyGenerator(universe) {
    let key = []

    for (let i = 0; i < universe.length; i++) {
        key.push([...universe[i]])
    }
    
    for (let i = 0; i < universe.length; i++) { 
        let galaxyPresent = false
        for (let j = 0; j < universe[i].length; j++) {
            if (universe[i][j] === "#") {
                galaxyPresent = true
            }
        }
        if (!galaxyPresent) {
            for (let j = 0; j < universe[i].length; j++) {
                key[i][j] = Math.pow(10, 6)
            }
        } else {
            for (let j = 0; j < universe[i].length; j++) {
                key[i][j] = 1
            }
        }
    }
    let colsToExpand = []
    for (let i = 0; i < universe[0].length; i++) {
        let galaxyCount = 0
        for (let j = 0; j < universe.length; j++) {
            if (universe[j][i] === "#") {
                galaxyCount++
            }
        }
        if (galaxyCount === 0) {
           colsToExpand.push(i)
        }
    }

    for (let j = 0; j < colsToExpand.length; j++) {
        let col = colsToExpand[j]
        for (let i = 0; i < key.length; i++) {
            if (key[i][col] === 1) {
                key[i][col] = Math.pow(10, 6)
            }
        }
    }
    return key
}

function expandedDistanceBetweenGalaxies(galaxy1, galaxy2, key) {
    let sum = 0

    let x1 = Math.min(galaxy1[1], galaxy2[1])
    let x2 = Math.max(galaxy1[1], galaxy2[1])
    let y1 = Math.min(galaxy1[0], galaxy2[0])
    let y2 = Math.max(galaxy1[0], galaxy2[0])

    if (x1 < x2) {
        for (let i = x1+1; i <= x2; i++) {
            sum += key[galaxy1[0]][i]
        }
    }
    if (y1 < y2) {
        for (let i = y1+1; i <= y2; i++) {
            sum += key[i][galaxy1[1]]
        }
    }

    return sum
}

function expandedDistanceSum(spaceImage) {
    let sum = 0
    const universe = bigSpaceMapper(spaceImage)
    const key = universeSizeKeyGenerator(universe)
    const galaxyList = findGalaxies(universe)

    for (let i = 0; i < galaxyList.length-1; i++) {
        for (let j = i+1; j < galaxyList.length; j++) {
            sum += expandedDistanceBetweenGalaxies(galaxyList[i], galaxyList[j], key)
        }
    }
    return sum
}

console.log(expandedDistanceSum(example))
console.log(expandedDistanceSum(input))


