const rows = 15
const cols = 15
const noOfMines = 40
var boxes = []

const clickMe = (xAndy) => {
    const x = xAndy[1]
    const y = xAndy[0]
    let clickStage = boxes[y][x].clickStage
    let sqNo = boxes[y][x].number
    if(clickStage === 'clickable' && sqNo !== -1){
        boxes[y][x].clickStage = 'Done'
        if(sqNo == 0){
            var surroundingArea = {
                topY: 0,
                bottomY: 0,
                leftX: 0,
                rightX: 0
            }
            surroundingArea.topY = Math.max(y - 1, 0)
            surroundingArea.bottomY = Math.min(y + 1, boxes.length - 1)
            surroundingArea.leftX = Math.max(x - 1, 0)
            surroundingArea.rightX = Math.min(x + 1, boxes[y].length - 1)
            for(var y1 = surroundingArea.topY; y1 < surroundingArea.bottomY + 1; y1++){
                for(var x1 = surroundingArea.leftX; x1 < surroundingArea.rightX + 1; x1++){
                    setTimeout(boxes[y1][x1].draw.click(),1)
                }
            }
        }
    }
    if(clickStage === 'clickable' && sqNo == -1){
        alert('game over')
        window.location.reload()
    }
    boxes[y][x].draw.style.color = '#000'

}
const makeSquare = (left, top, y, x) => {
    const squareEle = document.createElement('div')
    squareEle.style.left = left + "px"
    squareEle.style.top = top + "px"
    squareEle.classList.add('square')
    squareEle.setAttribute('onclick',"clickMe(["+ y + "," + x +"])")
    document.getElementById('board').appendChild(squareEle)
    return squareEle;
}

const init = () => {
    for(var i = 0; i < rows; i++){
        boxes.push([])
        for(var j = 0; j < cols; j++){
            var newBox = {
                number: 0,
                draw: makeSquare(i * 20, j * 20, i, j),
                clickStage: 'clickable'
            }
            boxes[i].push(newBox)
        }
    }
    for(var k = 0; k < noOfMines; k++){
        var y = Math.floor(Math.random() * boxes.length)
        var x = Math.floor(Math.random() * boxes[y].length)
        if(boxes[y][x].number == -1){
            k -= 1
        } else {
            boxes[y][x].number = -1
        }
    }
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            var surroundingArea = {
                topY: 0,
                bottomY: 0,
                leftX: 0,
                rightX: 0
            }
            surroundingArea.topY = Math.max(i - 1, 0)
            surroundingArea.bottomY = Math.min(i + 1, boxes.length - 1)
            surroundingArea.leftX = Math.max(j - 1, 0)
            surroundingArea.rightX = Math.min(j + 1, boxes[i].length - 1)
            if(boxes[i][j].number !== -1){
                for(var y = surroundingArea.topY; y < surroundingArea.bottomY + 1; y++){
                    for(var x = surroundingArea.leftX; x < surroundingArea.rightX + 1; x++){
                        if(boxes[y][x].number == -1){
                            boxes[i][j].number++
                        }
                    }
                }
            }
            boxes[i][j].draw.innerHTML = boxes[i][j].number
        }
    }
}


init()
