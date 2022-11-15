import {board} from "./bot_player.js"
import {threesixtyScan, reply_click, ScanBoard} from "./bot_eye.js"

export function markingRules() {
    var nullCheck
    var nullCount = 0
    var singleMark
    var multiMark = []
    ScanBoard()
    //console.table(board)
    for (let i = 0; i < board.length; i++) {
        for (let n = 1; n < 9; n++) {
            if (board[i][3] == n) {
                for (let j = 0; j < 8; j++) {
                    nullCheck = threesixtyScan(board[i][0], board[i][1], j)
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
                        var element = document.getElementById(`${multiMark[k]}`)
                        if (board[multiMark[k]][2] == "marked") {
                            continue
                        } else {
                            board[multiMark[k]][2] = "marked"
                            if (window.CustomEvent) {
                                element.dispatchEvent(
                                    new CustomEvent("contextmenu")
                                )
                            } else if (document.createEvent) {
                                var ev = document.createEvent("HTMLEvents")
                                ev.initEvent("contextmenu", true, false)
                                element.dispatchEvent(ev)
                            } else {
                                element.fireEvent("oncontextmenu")
                            }
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
    elimRules()
    //setTimeout(elimRules(), 3000)
}

export function elimRules() {
    var nullCheck
    let markedFlag
    var hiddenBlocks = []
    //ScanBoard()
    for (let i = 0; i < board.length; i++) {
        for (let n = 1; n < 9; n++) {
            if (board[i][3] == n) {
                for (let j = 0; j < 9; j++) {
                    if (j == 8 && markedFlag == n) {
                        hiddenBlocks.forEach((item) => {
                            board[item][2] = "number"
                            document.getElementById(`${item}`).click()
                            console.log(document.getElementById(`${item}`))
                            markedFlag = 0
                        })
                        continue
                    }
                    nullCheck = threesixtyScan(board[i][0], board[i][1], j)
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
