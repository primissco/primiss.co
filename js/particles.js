const size = 36;
const step = 49;
const numberOfParticles = 155;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const w = canvas.width = step * size;
const h = canvas.height = step * size;


class Particle {
	
 constructor(x, y) {
   this.pos = {x, y};
   this.dest = {x, y};
   this.speed = 0.5;
   this.rad = Math.floor(Math.random() * 8) + 2
   this.waiting = true;
   setTimeout(() => this.setDest(), Math.floor(Math.random() * 300) + 10)
  }
  
  move() {
    this.speed = Math.sqrt(distance(this.pos, this.dest) / 20);
    if (distance({x : this.pos.x, y: 0}, {x: this.dest.x, y: 0}) > 0.1){
      this.pos.x += this.pos.x < this.dest.x ? this.speed : -this.speed;
    } else if (distance({y : this.pos.y, x: 0}, {y: this.dest.y, x: 0}) > 0.1){
      this.pos.y += this.pos.y < this.dest.y ? this.speed : -this.speed;
    } else {
      if (!this.waiting){
        this.waiting = true;
        setTimeout(() => this.setDest(), Math.floor(Math.random() * 800) + 0)
      }
    }
  }
  
  setDest(){
    this.waiting = false;
     if (Math.random() >= 0.5){
       this.dest.x = this.dest.x + (Math.random() >= 0.5 ? -step : step) * (Math.random() >= 0.5 ? 1 : 2);
     } else {
       this.dest.y = this.dest.y + (Math.random() >= 0.5 ? -step : step) * (Math.random() >= 0.5 ? 1 : 2);
     }
    
    if (this.dest.x > step * (size - 1) || this.dest.x < step) {
      this.dest.x = this.pos.x;
      this.setDest();
    }
    
    if (this.dest.y > step * (size - 1) || this.dest.y < step) {
      this.dest.y = this.pos.y;
      this.setDest();
    }

  }
  
  draw() {
    ctx.strokeStyle = "rgba(46, 46, 46, 1)";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI);
    ctx.stroke();
    particles.map(p => {
      const dist = distance(p.pos, this.pos);
      if (dist < 150){
        ctx.strokeStyle = `rgba(218, 165, 33, ${(-dist + 100) / 100})`;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(p.pos.x, p.pos.y);
        ctx.stroke();
      }
    })
  }
}

particles = [];

  for(let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle((Math.floor(Math.random() * (size - 1)) + 1) * step, (Math.floor(Math.random() * (size - 1)) + 1) * step);
    particles.push(particle);
  }

const distance = (i, j) => {
  const a = i.x - j.x;
  const b = i.y - j.y;
  return Math.sqrt(a * a + b * b);
}

const drawBackground = alpha => {
  ctx.fillStyle = `#1b1c22`;
  ctx.fillRect(0, 0, w, h);
}

const drawParticles = () => {
  let x;
  let y;
  particles.forEach(p => {
    x = p.pos.x / size;
    y = p.pos.y / size;
    
    p.move();
    p.draw();
  });
}

const draw = () => {
  requestAnimationFrame(draw);
  drawBackground(1);
  drawParticles();
}

drawBackground(1);
draw();