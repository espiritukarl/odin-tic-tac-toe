const gameboard = (() => {
    const startButton = document.getElementsByClassName("start")[0]
    const playerNames = document.getElementsByClassName("player__name")
    const inputTags = document.getElementsByTagName("input")

    // creating the players
    const Player = (name, mark, turn, won, score) => {
        return {name, mark, turn, won, score}
    }

    let player1 = Player()
    let player2 = Player()
    
    startButton.addEventListener('click', (event) => {
        event.preventDefault()

        displayController.restart()
        player1 = Player(inputTags[0].value, "O", true, false, 0)
        player2 = Player(inputTags[1].value, "X", false, false, 0)

        displayController.player_score[0].textContent = 0
        displayController.player_score[1].textContent = 0

        playerNames[0].textContent = player1.name
        playerNames[1].textContent = player2.name
        inputTags[0].value = ''
        inputTags[1].value = ''
    })

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
            player1.score++
        } else if (player2.won = winCondition(player2.name, player2.mark).winner) {
            result = winCondition(player2.name, player2.mark).result
            player2.score++
        }

        winner = player1.won || player2.won

        return {
            winner,
            result,
        }
    }

    const displayScore = () => {
        let score1 = player1.score
        let score2 = player2.score
        return {
            score1,
            score2
        }
    }
    
    // const resetTurn = () => {
    //     player1.turn = true
    //     player2.turn = false
    // }

    return {
        // resetTurn,
        displayScore,
        checkWinner,
        Gameplay,
    }
})()

const displayController = (() => {
    const tictactoeBox = Array.from(document.getElementsByClassName("box"))
    const result = document.getElementsByClassName("result")[0]
    const player_score = document.getElementsByClassName("player__result")
    const restartButton = document.getElementsByClassName("restart")[0]
    let arr = []

    const restart = () => {
        restartButton.style.display = 'none'
        arr = []
        // gameboard.resetTurn()
        result.textContent = ''
        tictactoeBox.forEach((element) => {
            element.textContent = ''
        })
    }

    const printing = tictactoeBox.forEach((element) => {
        element.addEventListener('click', () => {
            if (element.textContent === '' && result.textContent === '') {
                element.textContent = gameboard.Gameplay()
                if(element.textContent !== '') {
                    arr.push(element.textContent)
                }                
                if (gameboard.checkWinner().winner) {
                    result.textContent = gameboard.checkWinner().result
                    player_score[0].textContent = gameboard.displayScore().score1/2
                    player_score[1].textContent = gameboard.displayScore().score2/2
                    restartButton.style.display = 'block'
                }
                else if (arr.length === 9) {
                    result.textContent = 'Draw'
                    restartButton.style.display = 'block'
                }
            }
        })
    })

    return {
        tictactoeBox,
        printing,
        result,
        player_score,
        restart
    } 
})()

displayController.printing