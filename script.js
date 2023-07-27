const gameboard = (() => {

    // creating the players
    const Player = (name, mark, turn, won) => {
        return {name, mark, turn, won}
    }

    let player1 = Player("player1", "O", true, false)
    let player2 = Player("player2", "X", false, false)

    const winCombos = [
        [0,1,2],
        [0,3,6],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ];

    const checkSubset = (parentArray, subsetArray) => {
        return subsetArray.every((el) => {
            return parentArray.includes(el)
        })
    }

    const Gameplay = () => {
        if (player1.turn) {
            player1.turn = !player1.turn
            player2.turn = !player2.turn
            return player1.mark
        } 
        else if (player2.turn) {
            player1.turn = !player1.turn
            player2.turn = !player2.turn
            return player2.mark
        }
    }

    const winCondition = (name, mark) => {
        let arr = []
        let winner = false
        let result = ''

        const getAllIndexes =(arr, val) => arr.flatMap((v, i) => v === val ? i : [])
        displayController.tictactoeBox.forEach((element) => {
            arr.push(element.textContent)
        })
        arr = getAllIndexes(arr, mark)

        winCombos.forEach((array) => {
            if (checkSubset(arr, array)) {
                result = `${name} won!`
                winner = true
            }
        })

        return {
            winner,
            result
        }
    }

    const checkWinner = () => {
        let winner = false
        let result = ''

        if (player1.won = winCondition(player1.name, player1.mark).winner) {
            result = winCondition(player1.name, player1.mark).result
        } else if (player2.won = winCondition(player2.name, player2.mark).winner) {
            result = winCondition(player2.name, player2.mark).result
        }

        winner = player1.won || player2.won

        return {
            winner,
            result
        }
    }
    
    const resetTurn = () => {
        player1.turn = true
        player2.turn = false
    }

    return {
        resetTurn,
        checkWinner,
        Gameplay,
        winCondition,
    }
})()

const displayController = (() => {
    const tictactoeBox = Array.from(document.getElementsByClassName("box"))
    const result = document.getElementsByClassName("result")[0]
    let arr = []

    let delayTimer = (element) => {
        setTimeout(() => {element.textContent = ''}, 1000)
    }

    let deleteContent = () => {
        arr = []
        gameboard.resetTurn()
        tictactoeBox.forEach((element) => {
            delayTimer(element)
        })
    }

    let printing = tictactoeBox.forEach((element) => {
        element.addEventListener('click', () => {
            if (element.textContent === '') {
                element.textContent = gameboard.Gameplay()
                arr.push(element.textContent)
                
                if (gameboard.checkWinner().winner) {
                    result.textContent = gameboard.checkWinner().result
                    deleteContent()
                    delayTimer(result)
                }
                else if (arr.length === 9) {
                    result.textContent = 'Draw'
                    deleteContent()
                    delayTimer(result)
                }
            }
        })
    })

    return {
        tictactoeBox,
        printing,
        result
    } 
})()

displayController.printing