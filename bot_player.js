import {ScanBoard, Position, threesixtyScan, reply_click} from "./bot_eye.js"
import {markingRules, elimRules} from "./bot_rules.js"

export var board = []

let anyClick = document.querySelector(".board")
anyClick.onclick = function () {
    action()
}
anyClick.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    action()
})

function action() {
    //console.table(board)
    var startTime = performance.now()

    markingRules()
    board.length = 0

    var endTime = performance.now()

    console.log(`${endTime - startTime} milliseconds`)

    //var selectX = board[reply_click()][0]
    //var selectY = board[reply_click()][1]
    //var tileStatus = board[reply_click()][2]
    //var numberValue = board[reply_click()][3]
    //console.log(Position(selectX, selectY))
    //console.table(threesixtyScan(selectX, selectY, 0))
}
