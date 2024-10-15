function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function genarray(size) {
    let array = []
    for (let i = 0; i < size; i++) {
        let num = 0
        while (array.includes(num)) {
            num = Math.floor(Math.random() * size)
        }
        array.push(num)
    }
    return array
}

const DOMdisplay = document.getElementById("display")

async function displayarray(array, selected) {
    let string = ""
    for (let i = 0; i < array.length; i++) {
        let atualString = ""
        let numDisplay = (array[i] / array.length) * 100
        if (selected != i) {
            atualString = `<div class="bar" style="width: ${100/array.length}vw ;height: ${numDisplay}vh;"></div>`
        } else {
            atualString = `<div class="bar" style="width: ${100/array.length}vw ;height: ${numDisplay}vh; background-color: red"></div>`
        }
        string += atualString

    }
    DOMdisplay.innerHTML = string
}
async function iteractionBubble(array) {
    let changes = 0
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            let high = array[i]
            let low = array[i + 1]
            array[i] = low
            array[i + 1] = high
            changes += 1
            displayarray(array, i)
            await sleep(10);
        }

    }
    if (changes != 0) {
        return iteractionBubble(array)
    } else {
        for (let a = 0; a<1; a++){
            for (let i = 0; i < array.length - 1; i++) {

                displayarray(array, i+1)
                await sleep(5);

            }
        }
        return

    }
}

function runSort(){
    let size = document.getElementById("size").value
    let type = document.getElementById("algo").value
    let array = genarray(size)
    switch (type){
        case "bubble":
            iteractionBubble(array)
    }
}