const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const speedButton = document.getElementById('btn');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
let speed = 1;
let smallDistanceThreshold = 8;
speedButton.innerHTML = ""+speed+"x";

//add events functions
canvas.addEventListener('click', function(event){
    mouseX = event.x;
    mouseY = event.y;

    if (particleArray.length == 0) {
        particleArray.push(new Particle(mouseX, mouseY)); //adds the first particle
    } else {
        particleArray = []; //reinit the simulation
    }
});

//if no click after 5 seconds show a message
setTimeout(function() {
    if (particleArray.length == 0) {
        alert("Click on the canvas to start the simulation");
    }
}, 5000);

function changeSpeed() {
    speed += 1;
    if (speed > 3) {
        speed = 1;
    }
    speedButton.innerHTML = ""+speed+"x";
}

//particle class

class Particle {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.connections = [];
    }

    addChild(indexChild) {
        this.connections.push(indexChild);
    }

    draw() {
        //draw the particle
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        //and all the found nearest connections
        for (let i = 0; i < this.connections.length; i++) {
            ctx.strokeStyle = 'green';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(particleArray[this.connections[i]].x, particleArray[this.connections[i]].y);
            ctx.stroke();
        }
    }
}    

//algorithm

function addRandomParticle(delta) {
    /* adds random particle at distance delta to the roadmap */

    //sample from uniform distribution 1 point in the canvas
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    
    // search for the index of the nearest particle to the point
    let index = 0;
    let smallestDistance = Infinity;
    for (let i = 0; i < particleArray.length; i++) {
        let distance = Math.sqrt((x - particleArray[i].x) ** 2 + (y - particleArray[i].y) ** 2);
        if (distance < smallestDistance) {
            smallestDistance = distance;
            index = i;
        }
    }
    // add a new particle at distance delta from the nearest particle
    let angle = Math.atan2(y - particleArray[index].y, x - particleArray[index].x);
    let newX = particleArray[index].x + delta * Math.cos(angle);
    let newY = particleArray[index].y + delta * Math.sin(angle);
    console.log("new particle at " + newX + " " + newY)
    particleArray.push(new Particle(newX, newY));
    particleArray[index].addChild(particleArray.length - 1);
    return smallestDistance;
}


//animation loop
t = 0;
smallestDistanceCountdown = 5; //to stop the simulation when the smallest distance is reached
function animate() {
    t+=1;
    
    if (t%(7-speed*2) == 0 && particleArray.length > 0 && smallestDistanceCountdown > 0) {
        //add a new particle to the particle array
        let smallestDistance = addRandomParticle(20);

        if (smallestDistance < smallDistanceThreshold) {
            smallestDistanceCountdown -= 1;
        } else {
            smallestDistanceCountdown = 5;
        }
    }

    if (smallestDistanceCountdown == 0 && particleArray.length == 0) {
        //reset the countdown to stop the simulation
        smallestDistanceCountdown = 5;
    }

    if (smallestDistanceCountdown > 0) { //if the simulation is stopped, don't draw
        //clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //draw the particles
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].draw();
        }
    }
    requestAnimationFrame(animate);
}
animate();
