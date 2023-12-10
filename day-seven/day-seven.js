const fs = require("fs");

const input = fs.readFileSync("day-seven/input.txt", "utf8");
const example = fs.readFileSync("day-seven/example.txt", "utf8");

const cardValues = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
};

const jokerCardValues = {
    A: 14,
    K: 13,
    Q: 12,
    J: 1,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
};

function totalWinnings(data) {
    let hands = data.split(/\r?\n/)
    hands = hands.map(hand => hand.split(" "))
    let handsBidsArray = []
    let bidValues = 0

    for (const [hand, bid] of hands) {
        handsBidsArray.push({
            hand: hand,
            bid: parseInt(bid),
            handType: handType(hand),
            })
    }

    handsBidsArray.sort((a, b) => {
        if (a.handType !== b.handType) {
            return a.handType - b.handType;
        } else {
            for (let i = 0; i < a.hand.length; i++) {
                if (a.hand[i] !== b.hand[i]) {
                    return cardValues[a.hand[i]] - cardValues[b.hand[i]]
                }
                
            }
        }
    })

    let multiplier = 1
    for (const hand of handsBidsArray) {
        bidValues += multiplier * hand.bid
        multiplier++
    }
    return bidValues
}

function handType(hand) {
    let cardFrequencies = new Map()

    for (const card of hand) {
        const frequency = cardFrequencies.get(card) || 0;

        cardFrequencies.set(card, frequency + 1)
    }
    const frequencies = new Set(cardFrequencies.values())

    if (cardFrequencies.size === 1) {
        // five of a kind
        return 7
    } else if (cardFrequencies.size === 2) {
        if (frequencies.has(1)) {
            // four of a kind
            return 6
        } else {
            // full house
            return 5
        }
    } else if (cardFrequencies.size === 3) {
        if (frequencies.has(3)) {
            // three of a kind
            return 4
        } else {
            // two pair
            return 3
        }
    } else if (cardFrequencies.size === 4) {
        //one pair
        return 2
    } else {
        // high card
        return 1
    }
}

function totalWinningsJokers(data) {
    let hands = data.split(/\r?\n/)
    hands = hands.map(hand => hand.split(" "))
    let handsBidsArray = []
    let bidValues = 0

    for (const [hand, bid] of hands) {
        handsBidsArray.push({
            hand: hand,
            bid: parseInt(bid),
            handType: handType(hand),
            })
    }

    handsBidsArray.sort((a, b) => {
        if (a.handType !== b.handType) {
            return a.handType - b.handType;
        } else {
            for (let i = 0; i < a.hand.length; i++) {
                if (a.hand[i] !== b.hand[i]) {
                    return jokerCardValues[a.hand[i]] - jokerCardValues[b.hand[i]]
                }
                
            }
        }
    })

    let multiplier = 1
    for (const hand of handsBidsArray) {
        bidValues += multiplier * hand.bid
        multiplier++
    }
    return bidValues
}

// console.log(totalWinnings(example)) 
// console.log(totalWinnings(input)) 
console.log(totalWinningsJokers(example))
console.log(totalWinningsJokers(input))