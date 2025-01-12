let r1 = 100;
let r2 = 100;

let m1 = 10;
let m2 = 10;

// Define PI correctly
let a1 = Math.PI / 3;
let a2 = 90;

let a1Vel = 0;
let a2Vel = 0;

let a1Acc = 0;
let a2Acc = 0;

// Reduce gravitational constant to slow down motion
let g = 1;

// Define damping factor
let damping = 0.999;

// Array to store the positions of the bottom weight
let trace = [];

function setup() {
  createCanvas(600, 600);
}

function draw() {

  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2Vel * a2Vel * r2 + a1Vel * a1Vel * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

  a1Acc = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = a1Vel * a1Vel * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2Vel * a2Vel * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

  a2Acc = (num1 * (num2 + num3 + num4)) / den;

  background(255);
  strokeWeight(2);

  translate(width / 2, height / 10);

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = r2 * sin(a2) + x1;
  let y2 = r2 * cos(a2) + y1;

  // Store the position of the bottom weight
  trace.push({ x: x2, y: y2 });

  // Draw the trace
  noFill();
  beginShape();
  for (let i = 0; i < trace.length; i++) {
    vertex(trace[i].x, trace[i].y);
  }
  endShape();

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, m2, m2);

  a1Vel += a1Acc;
  a2Vel += a2Acc;

  // Apply damping
  a1Vel *= damping;
  a2Vel *= damping;

  a1 += a1Vel;
  a2 += a2Vel;
}
