let LIGHT = 100
let HYSTERESIS = 8
LIGHT -= (HYSTERESIS / 2)
let DARK = LIGHT - HYSTERESIS
let ON_IMAGE = images.createImage(`
    99999
    99999
    99999
    99999
    99999
`)
let OFF_IMAGE = images.createImage(`
    00000
    00000
    00900
    00000
    00000
`)
let timing = false
let start_time = 0
let total_time = 0

basic.showString("L")

function show_number(n: number) {
    if (n < 10) {
        basic.showNumber(n)
    } else {
        basic.showString(n.toString())
    }
}

basic.forever(function () {
    let reading = input.lightLevel()
    if (reading < DARK) {
        if (timing) {
            let end_time = input.runningTime()
            total_time += (end_time - start_time)
            timing = false
        }
    } else if (reading >= LIGHT) {
        if (!timing) {
            start_time = input.runningTime()
            timing = true
        }
    }

    if (input.buttonIsPressed(Button.B)) {
        let minutes = total_time / 60000
        if (timing) {
            minutes += (input.runningTime() - start_time) / 60000
        }
        basic.clearScreen()
        show_number(Math.round(minutes))
        basic.pause(500)
    }

    if (timing) {
        ON_IMAGE.showImage(0)
    } else {
        OFF_IMAGE.showImage(0)
    }
    basic.pause(1000)
})
