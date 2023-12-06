const fs = require("fs");

const input = fs.readFileSync("day-six/input.txt", "utf8");
const example = fs.readFileSync("day-six/example.txt", "utf8");

function raceProductParser(data) {
    let racesArray = []
    let lines = data.split(/\r?\n/)

    let times = lines[0].split(":")[1].trim()
    let distances = lines[1].split(":")[1].trim()

    let timesArray = eliminateSpaces(times)
    let distancesArray = eliminateSpaces(distances)

    function eliminateSpaces(array) {
        let str = ""
        let result = []

        for (let i = 0; i < array.length; i++) {
            if (str = "" && array[i] === " ") {
                continue
            } else if (array[i] !== " ") {
                if (str === "") {
                    while (array[i] !== " " && i < times.length) {
                        str = str + array[i]
                        i++
                    }
                }
                result.push(parseInt(str))
                str = ""
            }
        }

        return result
    }

    for (let i = 0; i < distancesArray.length; i++) {
        racesArray.push([timesArray[i], distancesArray[i]])
    }

    return racesArray
}

function raceKernErrorParser(data) {
    let lines = data.split(/\r?\n/)

    let timeLine = lines[0].split(":")
    let time = timeLine[1].split(" ")

    let distanceLine = lines[1].split(":")
    let distance = distanceLine[1].split(" ")

    let timeInt = removeSpaces(time)
    let distanceInt = removeSpaces(distance)

    function removeSpaces(array) {
        let str = ""
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== " " ) {
                str = str + array[i]
            }
        }
        return parseInt(str)
    }

    return [timeInt, distanceInt]
}

function waysToBeatRecord(time, distance) {
    let firstValue = 0
    for (let i = 0; i < time; i++) {
        if (i * (time - i) > distance) {
            firstValue = i
            break
        }
    }
    return time - (2*firstValue) + 1
}

function recordBeatingProduct(races) {
    const racesArray = raceProductParser(races)
    let product = 1

    for (const race of racesArray) {
        let raceTime = race[0]
        let raceDistance = race[1]
        product *= waysToBeatRecord(raceTime, raceDistance)
    }
    return product
}

function kernErrorWaysToWin(races) {
    const kernErrorTime = raceKernErrorParser(races)[0]
    const kernErrorDistance = raceKernErrorParser(races)[1]
    return waysToBeatRecord(kernErrorTime, kernErrorDistance)
}


console.log(recordBeatingProduct(example))
console.log(recordBeatingProduct(input))

console.log(kernErrorWaysToWin(example))
console.log(kernErrorWaysToWin(input))