const fs = require("fs");

const input = fs.readFileSync("day-eight/input.txt", "utf8");
const example = fs.readFileSync("day-eight/example.txt", "utf8");
let example2 = fs.readFileSync("day-eight/part2Example.txt", "utf8");


function aToZ(data) {
    let lines = data.split(/\r?\n/)
    let directions = lines[0].split("")
    let locations = {}
    let moves = 0
    let currLocation = "AAA"
    let directionIdx = 0

    for (let i = 2; i < lines.length; i++) {
        let start = lines[i].slice(0, 3)
        let left = lines[i].slice(7,10)
        let right = lines[i].slice(12, 15)
        locations[start] = {
            "L" : left,
            "R" : right,
        }
    }

    while (currLocation !== "ZZZ") {
        let direction = directions[directionIdx]
        currLocation = locations[currLocation][direction]
        moves++
        directionIdx++
        if (directionIdx === directions.length) directionIdx = 0
    }



    return moves
}

function finalAsToFinalZs(data) {
    let moves = 0
    let lines = data.split(/\r?\n/)
    let directions = lines[0].split("")
    let directionIdx = 0
    let locations = {}
    let neededZs = 0
    let foundZs = 0
    let currLocationArray = []
    console.log(directions)

    for (let i = 2; i < lines.length; i++) {
        let start = lines[i].slice(0, 3)

        let left = lines[i].slice(7,10)
        let right = lines[i].slice(12, 15)
        if (start[2] === "A") {
            neededZs++
            currLocationArray.push(start)
        }
        locations[start] = {
            "L" : left,
            "R" : right,
        }
    }
    while (foundZs !== neededZs) {
        foundZs = 0
        for (let i = 0; i < neededZs; i++) {
            let direction = directions[directionIdx]
            let currLocation = currLocationArray.shift()
            // console.log("currLocation", currLocation, "options", locations[currLocation])
            let newLocation = locations[currLocation][direction]
            // console.log("newLocation", newLocation)
            // console.log(newLocation[2])
            if (newLocation[2] === "Z") foundZs++
            currLocationArray.push(newLocation)
        }
        moves++
        // console.log("moves",moves)
        if (foundZs > 0) console.log("foundZs",foundZs)
        directionIdx++
        if (directionIdx === directions.length) directionIdx = 0
    }

    return moves+1
}


//console.log(aToZ(example));
 console.log(Math.lcm(1,3,4));

// console.log(finalAsToFinalZs(example2))
// console.log(finalAsToFinalZs(input))