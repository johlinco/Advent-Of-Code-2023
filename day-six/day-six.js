const fs = require("fs");

const input = fs.readFileSync("day-five/input.txt", "utf8");
const example = fs.readFileSync("day-five/example.txt", "utf8");

function mapsParser(data) {
    let mapsArray = []
    let lines = data.split(/\r?\n/)

    mapsArray.push(lines[0].split(":")[1])

    for (let i = 3; i < lines.length; i++) {
        let array = []
        while (lines[i] !== "" && i < lines.length) {
            array.push(lines[i])
            i++
        }
        mapsArray.push(array)
        i++
    }

    return(mapsArray)
}
 
function passThroughMap(seedRange, map) {
    let newValues = []
    for (let seed of seedRange) {
        seed = parseInt(seed)
        if (seed/seed !==1) {
            continue
        } else {
            for (const row of map) {
                let values = row.split(" ")
                let destination = parseInt(values[0])
                let source = parseInt(values[1])
                let range = parseInt(values[2])
                if (seed >= source && seed < source + range) {
                    seed = seed + (destination - source)
                    break
                }
            }
        }
        newValues.push(seed)
    }
    return newValues
}
// [destination, source, range]

//if input is greater than or equal source and less than source + range
//output = source + (destination - source)

function seedToLocation(data) {
    let maps = mapsParser(data)
    let seeds = maps[0]
    seeds = seeds.split(" ")

    let soils = passThroughMap(seeds, maps[1])
    let fertilizers = passThroughMap(soils, maps[2])
    let waters = passThroughMap(fertilizers, maps[3])
    let lights = passThroughMap(waters, maps[4])
    let temperatures = passThroughMap(lights, maps[5])
    let humidities = passThroughMap(temperatures, maps[6])
    let locations = passThroughMap(humidities, maps[7])

    let minLocation = Infinity

    for (const location of locations) {
        minLocation = Math.min(minLocation, location)
    }

    return minLocation
}

function seedToLocationRangeOfSeeds(data) {
    let maps = mapsParser(data)
    let seeds = maps[0]
    seeds = seeds.split(" ")
    let seed1 = parseInt(seeds[1])
    let seed2 = parseInt(seeds[3])
    let seed1Range = parseInt(seeds[2])
    let seed2Range = parseInt(seeds[4])

    let seedRange = []

    for (let i = 0; i < seed1Range; i++) {
        seedRange.push(seed1+i)
        console.log(seed1Range.length)
    }
    for (let i = 0; i < seed2Range; i++) {
        seedRange.push(seed2+i)
    }
    console.log(seedRange)

    let soils = passThroughMap(seedRange, maps[1])
    let fertilizers = passThroughMap(soils, maps[2])
    let waters = passThroughMap(fertilizers, maps[3])
    let lights = passThroughMap(waters, maps[4])
    let temperatures = passThroughMap(lights, maps[5])
    let humidities = passThroughMap(temperatures, maps[6])
    let locations = passThroughMap(humidities, maps[7])

    let minLocation = Infinity

    for (const location of locations) {
        minLocation = Math.min(minLocation, location)
    }

    return minLocation
}

// console.log(seedToLocation(example))
// console.log(seedToLocation(input))
// console.log(seedToLocationRangeOfSeeds(example))
console.log(seedToLocationRangeOfSeeds(input))

