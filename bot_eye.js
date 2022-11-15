import {BOARD_SIZE, NUMBER_OF_MINES} from "./script.js"
import {board} from "./bot_player.js"

export function ScanBoard() {
    const x = []
    const y = []
    var setX = 0
    var setY = 0
    var counterY = 1
    var counterX = 0
    var numcount = 0
    var number
    const firstScan = document.querySelectorAll("div[data-status]")
    y.push(0)
    firstScan.forEach((firstScan) => {
        if (counterX % BOARD_SIZE == 0) {
            setX = 0
            x.push(setX)
        } else {
            setX++
            x.push(setX)
        }
        if (counterY % BOARD_SIZE != 0) {
            y.push(setY)
        } else {
            setY++
            y.push(setY)
        }
        number = document.getElementById(`${numcount}`).innerText
        if (number == "") {
            number = null
        }
        board.push([x[setX], y[counterY - 1], firstScan.dataset.status, number])
        numcount++
        counterX++
        counterY++
    })
}

export function Position(x, y) {
    var wantedPosition = []
    wantedPosition = [x, y]
    for (let i = 0; i < board.length; i++) {
        if (
            board[i][0] == wantedPosition[0] &&
            board[i][1] == wantedPosition[1]
        ) {
            return i
        }
    }
}

export function reply_click() {
    return event.srcElement.id
}

export function threesixtyScan(x, y, z) {
    const nearbyTiles = [
        "topLeft",
        "topMid",
        "topRight",
        "midLeft",
        "midRight",
        "botLeft",
        "botMid",
        "botRight",
    ]
    var xandy = []
    xandy = [x, y]
    if (xandy[0] - 1 < 0 || xandy[1] - 1 < 0) {
        const topLeft = nearbyTiles.indexOf("topLeft")
        if (topLeft == 0) {
            nearbyTiles[topLeft] = null
        }
    }
    if (xandy[1] - 1 < 0) {
        const topMid = nearbyTiles.indexOf("topMid")
        if (topMid == 1) {
            nearbyTiles[topMid] = null
        }
    }
    if (xandy[0] + 1 == BOARD_SIZE || xandy[1] - 1 < 0) {
        const topRight = nearbyTiles.indexOf("topRight")
        if (topRight == 2) {
            nearbyTiles[topRight] = null
        }
    }
    if (xandy[0] - 1 < 0) {
        const midLeft = nearbyTiles.indexOf("midLeft")
        if (midLeft == 3) {
            nearbyTiles[midLeft] = null
        }
    }
    if (xandy[0] + 1 == BOARD_SIZE) {
        const midRight = nearbyTiles.indexOf("midRight")
        if (midRight == 4) {
            nearbyTiles[midRight] = null
        }
    }
    if (xandy[0] - 1 < 0 || xandy[1] + 1 == BOARD_SIZE) {
        const botLeft = nearbyTiles.indexOf("botLeft")
        if (botLeft == 5) {
            nearbyTiles[botLeft] = null
        }
    }
    if (xandy[1] + 1 == BOARD_SIZE) {
        const botMid = nearbyTiles.indexOf("botMid")
        if (botMid == 6) {
            nearbyTiles[botMid] = null
        }
    }
    if (xandy[0] + 1 == BOARD_SIZE || xandy[1] + 1 == BOARD_SIZE) {
        const botRight = nearbyTiles.indexOf("botRight")
        if (botRight == 7) {
            nearbyTiles[botRight] = null
        }
    }
    for (var j = 0; j < board.length; j++) {
        if (board[j][0] == xandy[0] - 1 && board[j][1] == xandy[1] - 1) {
            const topLeft = nearbyTiles.indexOf("topLeft")
            if (topLeft == 0) {
                nearbyTiles[topLeft] = Position(x - 1, y - 1)
            }
        }
        if (board[j][0] == xandy[0] && board[j][1] == xandy[1] - 1) {
            const topMid = nearbyTiles.indexOf("topMid")
            if (topMid == 1) {
                nearbyTiles[topMid] = Position(x, y - 1)
            }
        }
        if (board[j][0] == xandy[0] + 1 && board[j][1] == xandy[1] - 1) {
            const topRight = nearbyTiles.indexOf("topRight")
            if (topRight == 2) {
                nearbyTiles[topRight] = Position(x + 1, y - 1)
            }
        }
        if (board[j][0] == xandy[0] - 1 && board[j][1] == xandy[1]) {
            const midLeft = nearbyTiles.indexOf("midLeft")
            if (midLeft == 3) {
                nearbyTiles[midLeft] = Position(x - 1, y)
            }
        }
        if (board[j][0] == xandy[0] + 1 && board[j][1] == xandy[1]) {
            const midRight = nearbyTiles.indexOf("midRight")
            if (midRight == 4) {
                nearbyTiles[midRight] = Position(x + 1, y)
            }
        }
        if (board[j][0] == xandy[0] - 1 && board[j][1] == xandy[1] + 1) {
            const botLeft = nearbyTiles.indexOf("botLeft")
            if (botLeft == 5) {
                nearbyTiles[botLeft] = Position(x - 1, y + 1)
            }
        }
        if (board[j][0] == xandy[0] && board[j][1] == xandy[1] + 1) {
            const botMid = nearbyTiles.indexOf("botMid")
            if (botMid == 6) {
                nearbyTiles[botMid] = Position(x, y + 1)
            }
        }
        if (board[j][0] == xandy[0] + 1 && board[j][1] == xandy[1] + 1) {
            const botRight = nearbyTiles.indexOf("botRight")
            if (botRight == 7) {
                nearbyTiles[botRight] = Position(x + 1, y + 1)
            }
        }
    }
    return nearbyTiles[z]
}
