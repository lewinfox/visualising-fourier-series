console.log('main.js connected');

let angle = 0;
let wave_data = [];
let slider  = 4;

function setup() {
    let canvas = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
    canvas.parent('canvas-container');
    // slider = createSlider(1, 10, 1); // Number of circles
    main_x = width / 5;
    main_y = height / 2;
    main_diameter = 200;
}

function draw() {
    background(16);

    translate(main_x, main_y);

    let x = 0;
    let y = 0;

    for (let i = 0; i < slider; i ++) {
        let prev_x = x;
        let prev_y = y;

        let n = i * 2 + 1;  // Getting the right progression for the fourier series
        let radius = 75 * (4 / (n * PI));

        x += radius * cos(n * angle);
        y += radius * sin(n * angle);

        stroke(255, 100);
        noFill();
        ellipse(prev_x, prev_y, radius * 2);

        stroke(255);
        line(prev_x, prev_y, x, y);
    }

    angle += 0.01;
}