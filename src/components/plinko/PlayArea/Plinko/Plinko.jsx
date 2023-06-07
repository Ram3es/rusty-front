import { Engine, World, Bodies, Events } from "matter-js";
import RustyGlowBall from "../../../assets/plinko/new/PlinkoGlowBall.svg";
import { createEffect, onCleanup, createSignal } from "solid-js";
import P5 from "p5";

import {
  rowsAmount,
  setBinLiftList,
  setBallDroppedXPos,
  setLastWinIndex,
  setBallActive,
  setBallCounter,
  addToIndexHistory,
} from "../../PlinkoContainer";

let engine = Engine.create();
let world = engine.world;
engine.gravity.y = 1;

const idealRows = 12; // The ideal number of rows for the current scale

const sizeDimensions = {
  8: {
    left: 96.25,
    right: 703.75,
    gap: 67.5,
    cutOff: 590,
  },
  10: {
    left: 103,
    right: 697,
    gap: 54,
    cutOff: 595,
  },
  12: {
    left: 107.5,
    right: 692.5,
    gap: 45,
    cutOff: 600,
  },
  14: {
    left: 110.71428571428572,
    right: 689.2857142857142,
    gap: 38.57142857142857,
    cutOff: 605,
  },
  16: {
    left: 113.125,
    right: 686.25,
    gap: 33.75,
    cutOff: 605,
  },
};

const [particleImage, setParticleImage] = createSignal();
const [scaleFactor, setScaleFactor] = createSignal(0);

function StaticObject(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;

  this.show = (sketch) => {
    sketch.push();
    sketch.fill(this.color);
    sketch.stroke("#26294B");
    sketch.strokeWeight(3);
    sketch.rectMode(sketch.CENTER);
    sketch.rect(this.x, this.y, this.width, this.height);
    sketch.pop();
  };
}

function Particle(x, y, r, svg) {
  setBallActive(true);
  this.body = Bodies.circle(x, y, r, {
    density: 1,
    restitution: 0.5,
    friction: 1,
    collisionFilter: {
      group: -1,
    },
  });
  this.img = svg;
  this.initialX = x;
  World.add(world, this.body);
  setBallDroppedXPos(x);

  this.show = (sketch) => {
    const pos = this.body.position;
    const angle = this.body.angle;

    sketch.push(); // Save current drawing context
    sketch.translate(pos.x, pos.y); // Move drawing context to particle center
    sketch.rotate(angle); // Rotate drawing context to match particle angle

    // Draw image centered at (0, 0), which is now the particle's center
    sketch.imageMode(sketch.CENTER);
    const imageWidth = r * 3; // Set the desired width of the image
    const imageHeight = r * 3; // Set the desired height of the image
    sketch.image(this.img, 0, 0, imageWidth, imageHeight);

    sketch.pop(); // Restore drawing context
  };
}

let pegsMap = new Map();

function Peg(x, y, r) {
  this.body = Bodies.circle(x, y, r, { isStatic: true });
  this.body.label = "peg";
  this.color = "#747AAF";
  this.radius = r;
  this.hitCount = 0; // Track the number of balls currently hitting the peg
  this.hitTimer = null; // Timer for delayed color change

  World.add(world, this.body);

  pegsMap.set(this.body, this); // Add mapping from body to Peg instance

  this.show = (sketch) => {
    var pos = this.body.position;

    if (this.hitCount > 0) {
      // Draw gold glow effect when peg is hit
      sketch.push();
      sketch.translate(pos.x, pos.y);
      sketch.fill(255, 207, 0, 10); // Gold color with reduced transparency
      sketch.noStroke();
      sketch.ellipse(0, 0, (this.radius + 8) * 2); // Outer glow
      sketch.fill("#FFB436"); // Solid gold color
      sketch.ellipse(0, 0, this.radius * 2); // Inner solid circle
      sketch.pop();
    } else {
      // Draw normal peg
      sketch.fill(this.color);
      sketch.stroke("#26294B");
      sketch.strokeWeight(3);
      sketch.ellipse(pos.x, pos.y, this.radius * 2); // Use the saved radius
    }
  };

  this.hit = () => {
    this.hitCount++;
    if (this.hitCount === 1) {
      // First ball hitting the peg
      this.color = "#FFB436"; // Change color when hit
    }
  };

  this.release = () => {
    this.hitCount--;
    if (this.hitCount === 0) {
      // No more balls hitting the peg
      this.hitTimer = setTimeout(() => {
        this.color = "#747AAF"; // Change color back
        this.hitTimer = null; // Reset the timer
      }, 100);
    }
  };
}

// Create a reactive signal for particles, initially empty
let [particles, setParticles] = createSignal([]);
let pegs = [];

// Create a function to add a new particle, which updates the particles signal
export const dropBall = (x) => {
  let particleRadius = scaleFactor() * 10;
  setParticles([
    ...particles(),
    new Particle(x, 50, particleRadius, particleImage()),
  ]);
};

// Function to remove all pegs from the world
function cleanupPegs() {
  for (let peg of pegs) {
    World.remove(world, peg.body);
  }
  pegs = [];
}

// Function to create new pegs
function createPegs() {
  let pegRadius = scaleFactor() * 6;
  let pegSpacing = scaleFactor() * 45;

  cleanupPegs(); // Clean up old pegs

  const finalRowPegs = []; // Store positions of the outermost pegs in the final row

  for (let i = 0; i < rowsAmount(); i++) {
    let startX = (800 - (i + 2) * pegSpacing) / 2;
    for (let j = 0; j <= i + 2; j++) {
      let y = 100 + i * pegSpacing;
      let x = startX + j * pegSpacing;
      pegs.push(new Peg(x, y, pegRadius));

      // Check if it is the final row and outermost pegs
      if (i === rowsAmount() - 1 && (j === 0 || j === i + 2)) {
        finalRowPegs.push({ x, y });
      }
    }
  }
  // console.log("Final Row Pegs:", finalRowPegs);
  // console.log("Spacing: ", pegSpacing);
}

const Plinko = () => {
  createEffect(() => {
    setScaleFactor(12 / rowsAmount());
  });

  // const debug1 = new StaticObject(152.5, 600, 2, 100, "#FFFFFF"); // Create a static object instance
  let sketchInstance;
  let lastTimestamp = performance.now();
  let frameCount = 0;
  let lastFpsUpdate = performance.now();

  createEffect(() => {
    createPegs();

    const sketch = (p5) => {
      p5.preload = () => {
        // Load the SVG image file
        const img = p5.loadImage(RustyGlowBall);
        setParticleImage(img);
      };

      p5.setup = () => {
        let canvas = p5.createCanvas(800, 639);
        canvas.parent("plinko");
      };

      p5.draw = () => {
        const startPhysics = performance.now();
        Engine.update(engine); // Update the physics engine
        const physicsTime = performance.now() - startPhysics;

        const startRender = performance.now();

        p5.clear();
        for (let particle of particles()) {
          particle.show(p5);
        }
        for (let peg of pegs) {
          peg.show(p5);
        }
        // debug1.show(p5);

        const renderTime = performance.now() - startRender;

        // Calculate FPS every second
        frameCount++;
        const now = performance.now();
        if (now - lastFpsUpdate >= 1000) {
          // If over a second has elapsed since the last FPS update
          // console.log(
          //   "FPS:",
          //   frameCount,
          //   "Physics time:",
          //   physicsTime,
          //   "Render time:",
          //   renderTime
          // );
          frameCount = 0; // Reset the frame count
          lastFpsUpdate = now; // Update the last FPS update time
        }
      };
    };

    sketchInstance = new P5(sketch, document.getElementById("plinko"));

    onCleanup(() => {
      sketchInstance.remove();
    });
  });

  return (
    <div>
      <div id="plinko" class="w-full h-full"></div>
    </div>
  );
};

export default Plinko;

let logOutput = []; // Variable to store log output

// Single afterUpdate event for all particles
Events.on(engine, "afterUpdate", () => {
  let newParticles = particles().filter((particle) => {
    if (
      particle.body.position.y >
      sizeDimensions[rowsAmount()].cutOff + particle.body.circleRadius
    ) {
      // console.log(
      //   `Dropped: ${particle.initialX} - End: ${calculateExitIndex(
      //     particle.body.position.x
      //   )}`
      // );
      // const exitIndex = calculateExitIndex(particle.body.position.x);
      // if (exitIndex !== -1) {
      //   const logObject = {
      //     end: exitIndex,
      //     x: particle.initialX,
      //   };
      //   logOutput.push(logObject);
      // }

      setBinLiftList((binLiftList) => [
        ...binLiftList,
        calculateExitIndex(particle.body.position.x),
      ]);
      const exitIndex = calculateExitIndex(particle.body.position.x);
      setLastWinIndex(exitIndex);
      addToIndexHistory(exitIndex);
      setBallCounter((prev) => prev + 1);

      World.remove(world, particle.body); // Remove the particle from the world
      return false;
    }
    return true;
  });
  setParticles(newParticles);
  const hasActiveParticles = newParticles.length > 0;
  setParticles(newParticles);
  setBallActive(hasActiveParticles); // Update ballActive signal
});

Events.on(engine, "collisionStart", function (event) {
  let pairs = event.pairs;
  for (let i = 0, j = pairs.length; i !== j; ++i) {
    let pair = pairs[i];

    // Check if the collision involves a peg
    if (pair.bodyA.label === "peg") {
      let peg = pegsMap.get(pair.bodyA); // Look up Peg instance
      peg.hit(); // Trigger hit animation
    } else if (pair.bodyB.label === "peg") {
      let peg = pegsMap.get(pair.bodyB); // Look up Peg instance
      peg.hit(); // Trigger hit animation
    }
  }
});

Events.on(engine, "collisionEnd", function (event) {
  let pairs = event.pairs;
  for (let i = 0, j = pairs.length; i !== j; ++i) {
    let pair = pairs[i];

    // Check if the collision involves a peg
    if (pair.bodyA.label === "peg") {
      let peg = pegsMap.get(pair.bodyA); // Look up Peg instance
      peg.release(); // Release the ball from the peg
    } else if (pair.bodyB.label === "peg") {
      let peg = pegsMap.get(pair.bodyB); // Look up Peg instance
      peg.release(); // Release the ball from the peg
    }
  }
});

const calculateExitIndex = (x) => {
  const dimensions = sizeDimensions[rowsAmount()];
  const gap = dimensions.gap;
  const left = dimensions.left;
  const right = dimensions.right;

  const index = Math.floor((x - left) / gap);
  if (index < 0 || x > right) {
    return -1;
  }

  return index;
};

// Function to prompt the user to download the log file
export function downloadLogFile() {
  const jsonOutput = JSON.stringify(logOutput, null, 2);
  const blob = new Blob([jsonOutput], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sim_rows_16.json";
  a.click();
  URL.revokeObjectURL(url);
}
