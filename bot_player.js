import {ScanBoard, Position, threesixtyScan, reply_click} from "./bot_eye.js"
import {rotationAlgorithm} from "./bot_rules.js"

export const board = []

const button = document.getElementById("button")
button.addEventListener("click", action)

// let anyClick = document.querySelector(".board")
// anyClick.onclick = function () {
//     action()
// }
// anyClick.addEventListener("contextmenu", (e) => {
//     e.preventDefault()
//     action()
// })

function action() {
    const startTime = performance.now()

    rotationAlgorithm()
    board.length = 0

    const endTime = performance.now()

    console.log(`${endTime - startTime} milliseconds`)

    //var selectX = board[reply_click()][0]
    //var selectY = board[reply_click()][1]
    //var tileStatus = board[reply_click()][2]
    //var numberValue = board[reply_click()][3]
    //console.log(Position(selectX, selectY))
    //console.table(threesixtyScan(selectX, selectY, 0))
}
