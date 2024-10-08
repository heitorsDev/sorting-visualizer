function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function genarray(size) {
    let array = []
    for (let i = 0; i < size; i++) {
        let num = 0
        while (array.includes(num)) {
            num = Math.floor(Math.random() * 100)
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
            atualString = `<div class="bar" style="width: ${array.length / 100}vw ;height: ${numDisplay}vh;"></div>`
        } else {
            atualString = `<div class="bar" style="width: ${array.length / 100}vw ;height: ${numDisplay}vh; background-color: red"></div>`
        }
        string += atualString

    }
    DOMdisplay.innerHTML = string
}
let array = genarray(100)
async function iteractionBubble() {
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
        return iteractionBubble()
    } else {
        for (let a = 0; a<2; a++){
            for (let i = 0; i < array.length - 1; i++) {

                displayarray(array, i+1)
                await sleep(5);

            }
        }
        return

    }
}
displayarray(array)
iteractionBubble()