function toZero(number, decay) {
   // if (number == 0) return 0;
    const sign = Math.sign(number);
    number = Math.abs(number);
    number = Math.max(number - decay, 0);
    return number * sign;
  }
class Wave{
	constructor(bounds){
		this.position = 0;
		this.direction = 1;
		this.amplitude = GRID*2;
	}
	setWaveProperties(pos,dir,amp){
		this.position = pos;
		this.direction = dir;
		this.amplitude = amp;
	}
	reduceAmplitude(){
		this.amplitude = toZero(this.amplitude, 2);	
	};
	updatePosition(max){
		this.position += this.direction
		if (this.position >= max){
			this.position = max-1;
			this.direction *= -1;
		}
		else if(this.position < 0){
			this.position = 0;
			this.direction *= -1;
		}
	}
	
}
class WaterDrop{
	constructor(x,y){
		this.x = x;
		this.y = y*GRID;
		this.w = PX_SIZE;
		this.h = -GRID;
		this.velocity = 0;
		this.amp = 0;
	}
	bounce(){
		if (this.amp == 0) return;
		
		this.h += this.velocity;
		
		this.checkWaveMinMaxBounds();
		this.updateWaveVelocity();
		this.reduceAmplitude();
	}
	updateWaveVelocity(){
		let grav = .5;
		if (this.h >= -GRID){
			grav *=-1
		}
		this.velocity += grav;	
	}
	checkWaveMinMaxBounds(){
		const min = -GRID - this.amp;
		const max = -GRID + this.amp/2;
		if (this.h < min){
			this.h = min;
			this.velocity = this.velocity*.2;
		}
		else if (this.h > max){
			this.h = max;
			this.velocity = this.velocity*.2;
		}
	};
	reduceAmplitude(){
		this.amp = toZero(this.amp, .4);
		if (this.amp == 0) {
			this.h = -GRID
		}
	};
	draw(){
		ctx.fillStyle = COLORS.BLUE;
		ctx.fillRect(this.x,this.y,this.w,this.h)
	}
}

class WaterPool{
	constructor(dropCount){
		this.size = dropCount;
		this.drops = [];
		this.wave = new Wave(dropCount);
		for(let i=0;i<dropCount;i++){
		this.drops.push(new WaterDrop(3*GRID+i*PX_SIZE,6));
		}
	}
	update(){
		if(this.wave.position < 0) return;
		const drop = this.drops[this.wave.position]
		drop.amp += this.wave.amplitude/2;
		drop.velocity = Math.min(drop.velocity-4,-4);
		
		this.wave.updatePosition(this.size);
		this.wave.reduceAmplitude();
		if (this.wave.amplitude == 0)this.wave.position = -1;
	}
}

function GroundBlock(x,y,w){
	this.x = x*GRID;
	this.y = y*GRID;
	this.w = w*GRID;
	this.h = C_HEIGHT - this.y;
	this.coords = [this.x,this.y,this.w,this.h];
}

var groundBlocks = [
					new GroundBlock(0,5,3),
					new GroundBlock(9,5,3),
					new GroundBlock(3,6,6)
					]
					
function drawGround(){
	ctx.fillStyle = COLORS.RED;
	ctx.fillRect(...groundBlocks[0].coords);
	ctx.fillRect(...groundBlocks[1].coords);
	ctx.fillRect(...groundBlocks[2].coords);
}

function initializeGame(){
	GAME = new GameControl();
	oasis = new WaterPool(24);
	mainloop()
}

class GameControl{
  constructor(){
  }
  update(){
	 
  }
  draw(){
	//oasis.drops[5].draw()
	oasis.update()
	oasis.drops.forEach(drop=>drop.draw())
	oasis.drops.forEach(drop=>drop.bounce())
	drawGround()
  }
}

function mainloop(){
requestAnimationFrame(mainloop)
ctx.clearRect(0,0,canvas.width,canvas.height)
GAME.update();
GAME.draw();
console.log()
}
initializeGame();