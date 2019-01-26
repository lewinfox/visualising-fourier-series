console.log('main.js connected');

let angle = 0;

function setup() {
    let canvas = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
    canvas.parent('canvas-container');
    main_x = width / 5;
    main_y = height / 2;
    main_diameter = 200;
}

function draw() {
    // resizeCanvas(windowWidth * 0.9, windowHeight * 0.8); 
    background(16);

    // Draw the first circle
    noFill();
    stroke(255);
    ellipse(main_x, main_y, main_diameter);

    // Calculate the position of the blob based on `angle`
    let x = Math.sin(angle) * main_diameter / 2;
    let y = Math.cos(angle) * main_diameter / 2;
    translate(main_x, main_y);  // Gets us into the centre of the main circle
    // Draw a line
    line(0, 0, x, y)
    fill(255);
    ellipse(x, y, 10, 10);

    angle += 0.01;
}