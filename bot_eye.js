import {BOARD_SIZE, NUMBER_OF_MINES} from "./script.js"
import {board} from "./bot_player.js"

export function ScanBoard() {
    const x = []
    const y = []
    let setX = 0
    let setY = 0
    let counterY = 1
    let counterX = 0
    let numcount = 0
    let number
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
    const wantedPosition = [x, y]
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
    const xandy = [x, y]
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
    for (let j = 0; j < board.length; j++) {
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

export function leftClick(item) {
    board[item][2] = "number"
    document.getElementById(`${item}`).click()
    //console.log(document.getElementById(`${item}`))
}

export function rightClick(markedBlock) {
    var element = document.getElementById(`${markedBlock}`)
    board[markedBlock][2] = "marked"
    if (window.CustomEvent) {
        element.dispatchEvent(new CustomEvent("contextmenu"))
    } else if (document.createEvent) {
        var ev = document.createEvent("HTMLEvents")
        ev.initEvent("contextmenu", true, false)
        element.dispatchEvent(ev)
    } else {
        element.fireEvent("oncontextmenu")
    }
}

export function areAligned(first, second, third) {
    if (
        (board[first][0] == board[second][0] &&
            board[first][0] == board[third][0]) ||
        (board[first][1] == board[second][1] &&
            board[first][1] == board[third][1])
    ) {
        return true
    } else {
        return false
    }
}

export function previousHiddenBlocks(offset) {
    const previousBlocks = []
    for (let j = 0; j < 9; j++) {
        if (j == 8 && previousBlocks.length == 3) {
            return [previousBlocks[0], previousBlocks[1], previousBlocks[2]]
        }
        const prevBlockCount = threesixtyScan(
            board[offset][0],
            board[offset][1],
            j
        )
        if (
            prevBlockCount == null ||
            typeof board[prevBlockCount][3] == "string"
        ) {
            continue
        }
        // if (board[prevBlockCount][2] == "marked") {
        //     currentMarkedBlocks.push(prevBlockCount)
        // }
        if (board[prevBlockCount][2] == "hidden") {
            previousBlocks.push(prevBlockCount)
        }
    }
}

export function previousMarkedBlocks(offset) {
    let markedFlag = 0
    for (let j = 0; j < 9; j++) {
        if (j == 8) {
            return markedFlag
        }
        const markedBlockCount = threesixtyScan(
            board[offset][0],
            board[offset][1],
            j
        )
        if (
            markedBlockCount == null ||
            typeof board[markedBlockCount][3] == "string"
        ) {
            continue
        }
        if (board[markedBlockCount][2] == "marked") {
            markedFlag++
        }
    }
}

export function setDifOp(currBlocks, prevBlocks) {
    let currentBlocks = [...currBlocks]
    let previousBlocks = [...prevBlocks]

    currentBlocks = currentBlocks.filter(function (element) {
        return element !== undefined
    })

    const currentBlocksSet = new Set()
    const previousBlocksSet = new Set()

    for (let item of currentBlocks) {
        currentBlocksSet.add(item)
    }
    for (let item of previousBlocks) {
        previousBlocksSet.add(item)
    }

    const differenceToMin = new Set(
        [...currentBlocksSet].filter((a) => !previousBlocksSet.has(a))
    )

    const differenceToMax = new Set(
        [...previousBlocksSet].filter((b) => !currentBlocksSet.has(b))
    )

    const minValue = [...differenceToMin][0]
    const maxValue = [...differenceToMax][0]

    leftClick(maxValue)
    rightClick(minValue)
}

export function aplyChanges(offset, currBlocks) {
    let currentBlocks = [...currBlocks]
    let previousBlocks = previousHiddenBlocks(offset) || []
    var prevMarkedBlocks = previousMarkedBlocks(offset)
    if (
        board[offset][3] - prevMarkedBlocks == 1 &&
        previousBlocks.length == 3 &&
        areAligned(previousBlocks[0], previousBlocks[1], previousBlocks[2])
    ) {
        setDifOp(currentBlocks, previousBlocks)
    }
}

export function checkConditions(i, currBlocks, currMarkedBlocks) {
    let currentBlocks = [...currBlocks]
    let currentMarkedBlocks = [...currMarkedBlocks]
    if (
        board[i][3] - currentMarkedBlocks.length == 2 &&
        currentBlocks.length == 3 &&
        areAligned(currentBlocks[0], currentBlocks[1], currentBlocks[2])
    ) {
        const minusX = Position(board[i][0] - 1, board[i][1])
        aplyChanges(minusX, currentBlocks)

        const plusX = Position(board[i][0] + 1, board[i][1])
        aplyChanges(plusX, currentBlocks)

        const minusY = Position(board[i][0], board[i][1] - 1)
        aplyChanges(minusY, currentBlocks)

        const plusY = Position(board[i][0], board[i][1] + 1)
        aplyChanges(plusY, currentBlocks)
    }
}
