const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
//1° crear una matriz vacia de las variables balls.
var balls =[];




function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  

  Engine.update(engine);
  ground.display();

  /*3° al sar el bucle for sobre la matriz ball,
  obtendremos todas las balas de cañon de la matriz ball*/
  for (var i = 0; i < balls.length; i++) {
    /*4° usar el bucle for para llamar a 
    showCannonBalls() varias veces*/
    showCannonBalls(balls[i], i);
  }

  cannon.display();
  tower.display();
  cannonBall.display()
 
}


/*2° crear una funcion keyPressed() y agregar la bala
de cañon a la matriz*/
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}
//5° incluir la funcion showCannonBalls() para mostrar la bala.
function showCannonBalls(ball, index) {
  ball.display();
  /*agregar la condicion para verificar la posicion de la bala
  y quitar la bala del world*/
  if(ball.body.position.x >= width ||
    ball.body.position.y >= height -50){
    Matter.World.remove(world, ball.body);
    /*acceder a las balas de cañon desde la matriz ball
    y aplicar la funcion shoot() en ellas.*/
    balls.splice(index, 1);
    }
}
/*6° acceder a las balas de cañon desde la matriz ball y aplicar
funcion shoot() en ellas.*/
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length -1].shoot();
  }
}
