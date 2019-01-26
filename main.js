console.log('main.js connected');

let angle = 0;
let wave_data = [];

function setup() {
    let canvas = createCanvas(windowWidth * 0.8, windowHeight * 0.5);
    canvas.parent('canvas-container');
    main_x = width / 5;
    main_y = height / 2;
    main_diameter = 200;
}

function draw() {

    // Capture the number of circles from input
    n_series = parseInt(document.getElementById('n-series').value);

    background(16);

    // Get us to the centre of the starting circle
    translate(main_x, main_y);

    let x = 0;
    let y = 0;

    for (let i = 0; i < n_series; i ++) {
        // Incrementally jump outwards from the starting point, adjusting the
        // radius and angle each time and drawing the relevant bits
        let prev_x = x;
        let prev_y = y;

        let n = i * 2 + 1;  // Getting the right progression for the fourier series (1, 3, 7...)
        // let radius = 75 * (4 / (n * PI));
        let radius = 75 * (3 / (n * PI));

        x += radius * cos(n * angle);
        y += radius * sin(n * angle);

        // Draw the circle
        stroke(255, 100);
        noFill();
        ellipse(prev_x, prev_y, radius * 2);

        // Draw the line
        stroke(255);
        line(prev_x, prev_y, x, y);
    }

    // Add the new point into the wave array
    wave_data.unshift(y);

    // Drawing the wave
    translate(200, 0);

    drawWave(wave_data);

    // Draw the line connecting the overall position to the wave
    stroke(64);
    line(x - 200, y, 0, wave_data[0]);  // Line joining the tip of the circle to the start of the wave



    angle += 0.025;
}

function drawWave(wave_data, r=255, g=255, b=255) {
    stroke(r, g, b);
    beginShape();
    noFill();
    for (let i = 0; i < wave_data.length; i++) {
        vertex(i, wave_data[i]);
    }
    endShape();
    // Trim the wave_data array to stop it getting too large
    if (wave_data.length > width) {
        wave_data.pop();
    }
}