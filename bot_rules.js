import {board} from "./bot_player.js"
import {
    threesixtyScan,
    Position,
    ScanBoard,
    rightClick,
    leftClick,
    checkConditions,
} from "./bot_eye.js"

export function rotationAlgorithm() {
    ScanBoard()
    // console.table(board)
    basicMarkingRules()
    elimRules()
    MarkingRules()
}

export function basicMarkingRules() {
    let nullCount = 0
    const multiMark = []
    for (let i = 0; i < board.length; i++) {
        for (let n = 1; n < 9; n++) {
            if (board[i][3] == n) {
                for (let j = 0; j < 8; j++) {
                    const nullCheck = threesixtyScan(
                        board[i][0],
                        board[i][1],
                        j
                    )
                    if (nullCheck == null || board[nullCheck][2] == "number") {
                        nullCount++
                    } else if (
                        board[nullCheck][2] == "hidden" ||
                        board[nullCheck][2] == "marked"
                    ) {
                        multiMark.push(nullCheck)
                    }
                }

                if (nullCount == 8 - n) {
                    for (let k = 0; k < multiMark.length; k++) {
                        if (board[multiMark[k]][2] == "marked") {
                            continue
                        } else {
                            rightClick(multiMark[k])
                        }
                    }
                    multiMark.length = 0
                }
                nullCount = 0
                multiMark.length = 0
            }
        }
        nullCount = 0
    }
}

export function elimRules() {
    let markedFlag
    const hiddenBlocks = []
    for (let i = 0; i < board.length; i++) {
        for (let n = 1; n < 9; n++) {
            if (board[i][3] == n) {
                for (let j = 0; j < 9; j++) {
                    if (j == 8 && markedFlag == n) {
                        hiddenBlocks.forEach((item) => {
                            leftClick(item)
                            markedFlag = 0
                        })
                        continue
                    }
                    const nullCheck = threesixtyScan(
                        board[i][0],
                        board[i][1],
                        j
                    )
                    if (
                        nullCheck == null ||
                        typeof board[nullCheck][3] == "string"
                    ) {
                        continue
                    }
                    if (board[nullCheck][2] == "marked") {
                        markedFlag++
                    }
                    if (board[nullCheck][2] == "hidden") {
                        hiddenBlocks.push(nullCheck)
                    }
                }
                hiddenBlocks.length = 0
                markedFlag = 0
            }
        }
    }
}

export function MarkingRules() {
    const currentMarkedBlocks = []
    const currentBlocks = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < 9; j++) {
            if (j == 8) {
                checkConditions(i, currentBlocks, currentMarkedBlocks)
                currentBlocks.length = 0
                currentMarkedBlocks.length = 0
                continue
            }
            const nullCheck = threesixtyScan(board[i][0], board[i][1], j)
            if (nullCheck == null || typeof board[nullCheck][3] == "string") {
                continue
            }
            if (board[nullCheck][2] == "marked") {
                currentMarkedBlocks.push(nullCheck)
            }
            if (board[nullCheck][2] == "hidden") {
                currentBlocks.push(nullCheck)
            }
        }
        currentBlocks.length = 0
        currentMarkedBlocks.length = 0
    }
}
