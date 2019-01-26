console.log('main.js connected');

const data = {
    waves: [],
    angle: 0
}

class Wave {
    constructor(r = 255, g = 255, b = 255, weight = 2) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.weight = weight;
        this.data = [];
        this.plot = function() {
            // Use the object's own colour and weight
            stroke(this.r, this.g, this.b);
            strokeWeight(this.weight);
            // Draw the wave
            beginShape();
            noFill();
            for (let i = 0; i < this.data.length; i++) {
                vertex(i, this.data[i]);
            }
            endShape();
            // Trim the wave_data array to stop it getting too large
            if (this.data.length > width) {
                this.data.pop();
            }
        }
    }
}

function setup() {
    let canvas = createCanvas(windowWidth * 0.8, windowHeight * 0.5);
    canvas.parent('canvas-container');
    start_x = width / 5;
    sstart_y = height / 2;
    document.getElementById('n-waves').addEventListener('change', waveNumChange);
    waveNumChange();
}

function draw() {

    let n_waves = parseInt(document.getElementById('n-waves').value);

    background(16);

    // Get us to the centre of the starting circle
    translate(start_x, sstart_y);

    let x = 0;
    let y = 0;

    for (let i = 0; i < n_waves; i ++) {
        // Changes to the nuber of waves mean waves[i] may not exist so we
        // need to check
        if (data.waves[i]) {
            // Incrementally jump outwards from the starting point, adjusting the
            // radius and angle each time and drawing the relevant bits
            let prev_x = x;
            let prev_y = y;

            let n = i * 2 + 1;  // Getting the right progression for the fourier series (1, 3, 7, ...)
            let radius = 75 * (4 / (n * PI));

            x += radius * cos(n * data.angle);
            y += radius * sin(n * data.angle);

            // Push the y value into the appropriate wave_data entry
            data.waves[i].data.unshift(y)

            // Draw the circle
            let r = data.waves[i].r;
            let g = data.waves[i].g;
            let b = data.waves[i].b;
            stroke(r, g, b);
            strokeWeight(1);
            noFill();
            ellipse(prev_x, prev_y, radius * 2);

            // Draw a line from the centre of the circle to the point
            line(prev_x, prev_y, x, y);
        }
    }

    // Drawing the wave
    translate(200, 0);
    for (let i = 0; i < n_waves; i++) {
        // Check that the wave exists to avoid errors
        if (data.waves[i]) {
            data.waves[i].plot();
        }
    }

    // Draw the line connecting the overall position to the wave
    if (data.waves[n_waves - 1]) {
        let final_y = data.waves[n_waves - 1].data[0];
        stroke(64);
        line(x - 200, y, 0, final_y);

        // Increment the angle
        data.angle += 0.025;
    }
}

function waveNumChange() {
    // Capture the number of circles from input
    n_waves = parseInt(document.getElementById('n-waves').value);
    // Reset everyting
    data.waves = [];
    data.angle = 0;
    // Create `n` new wave objects
    for (let i = 0; i < n_waves; i++) {
        if (i == n_waves - 1) {
            // push a wave with a this white line (for drawing the final wave)
            data.waves.push(new Wave());
        } else {
            // push a wave with a random colour
            r = Math.random() * 255;
            g = Math.random() * 255;
            b = Math.random() * 255;
            data.waves.push(new Wave(r, g, b, 1));
        }
    }
}
