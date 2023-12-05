const fs = require("fs");

const input = fs.readFileSync("day-four/input.txt", "utf8");

let cards = input.split(/\r?\n/)

function cardSum(cards) {

    let cardData = cards.map(
        (card) => card.split(":")
    )
    
    let winners = cardData.map(
        (card) => card[1].split("|")[0]
    )
    
    winners = winners.map(
        (list) => list.split(" ")
    )
    
    let myNumbers = cardData.map(
        (card) => card[1].split("|")[1]
    )
    
    myNumbers = myNumbers.map(
        (list) => list.split(" ")
    )
    
    let matchSum = 0
    
    for (let i = 0; i < cards.length; i++) {
        let cardPoints = 0
        let winnersSet = new Set()
        for (winner of winners[i]) {
            if (parseInt(winner)/parseInt(winner) === 1)
            winnersSet.add(winner)
        }
        for (number of myNumbers[i]) {
            if (winnersSet.has(number)) {
                cardPoints === 0 ? cardPoints = 1 : cardPoints *= 2
            }
        }
        matchSum += cardPoints
    }
    
    return (matchSum)
}

function cardCounter(cards) {
    let newDeck = cards
    console.log(newDeck.length)
    for (card of newDeck) {
        let winners = card.slice(9, 39).split(' ')
        let myNumbers = card.slice(41).split(' ')
        let cardNumber = parseInt(card.slice(5,8))
        let matches = 0
        let winnersSet = new Set()
        for (winner of winners) {
            if (parseInt(winner)/parseInt(winner) === 1) {
                winnersSet.add(winner)
            }
        }
        for (number of myNumbers) {
            if (winnersSet.has(number)) {
                matches++
            }
        }

        for (let i = 0; i < matches; i++) {
            newDeck.push(cards[cardNumber+i])
        }
    }

    return newDeck.length
}



console.log(cardSum(cards))
console.log(cardCounter(cards))
