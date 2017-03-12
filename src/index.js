const gpio = require('rpi-gpio');

const flashTime = 250;
const pin = 7;

gpio.setup(pin, gpio.DIR_OUT, flash);

function flash(isOn = false) {
    const newState = !isOn;

    gpio.write(pin, newState, (err) => {
        if (err) throw err;
        setTimeout(() => flash(newState), flashTime);
    });
}
