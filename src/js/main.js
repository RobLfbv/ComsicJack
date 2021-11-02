'use strict';
var canvas;
var game;



var PLAYER_HEIGHT = 69;
var PLAYER_WIDTH = 34;
const OBSTACLE_RADIUS = 20;

const JUMP_HEIGHT = 130;
var player_fall = 5;
var degre = 0;
var drapeau = 0;
var drapeaubis = 0;

var sprites = new Image();
sprites.onload = animate;
sprites.src = "./src/sprites/CJ_Runing/cj_running.png";
var step = 0;
var etat = 0;

function draw() {
    var context = canvas.getContext('2d');
    context.imgaeSmoothingEnabled = false;
    //Terrain
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height/1.5);
    //Joueur
    drawPerso(0,game.player.y, Math.floor(step));

    //Obstacle
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(game.obstacle.x, game.obstacle.y, game.obstacle.r, 0, Math.PI*2, false);
    context.fill();  
 }
function drawPerso(x,y,step){
    var context = canvas.getContext('2d');
    context.imgaeSmoothingEnabled = false;
    if(etat == 0){
        context.drawImage(sprites,34*step,0,34,72,x,y,34,72);
    }else if(etat == 1){
        context.drawImage(sprites,27*step,0,27,63,x,y,34,72);
    }
}

function update(){
    if(etat == 0){
        step+= 0.01;
        if(step >= 2){step -= 2}
    }
    
    if(etat == 1){
        step += 0.075;
        if(step >= 2){step -=2}
    }
}

function animate(){
    draw();
    update();
    requestAnimationFrame(animate);
}

function play(){
    game.obstacle.x -= game.obstacle.speed.x;

    onkeydown = function(e){

    	if(e.keyCode == 40){
    		if(drapeaubis == 1){
    			player_fall = 10;
    		}
    		PLAYER_HEIGHT = 15;
    		document.addEventListener('keyup', e => {
  				player_fall = 5;
  				PLAYER_HEIGHT = 30;
			});
    	}
    		
        if(e.keyCode == 32 && drapeaubis == 0){
        	degre += 80;


            document.addEventListener('keyup', e => {
                sprites.src = "./src/sprites/CJ_Jumping/cj_jet.png";
  				drapeau = 1;
            	drapeaubis = 1;
                etat = 1;
			});
        }
    }
    if(degre>JUMP_HEIGHT){
    	degre = JUMP_HEIGHT;
    }
    if(drapeau == 1 && game.player.y>= canvas.height / 1.5 - PLAYER_HEIGHT - degre){
    	game.player.y -= 10;//monter
    }
    if(drapeau == 1 && game.player.y < canvas.height / 1.5 - PLAYER_HEIGHT - degre){
    	drapeau = 0;
    }
    if(drapeau == 0 && game.player.y<canvas.height / 1.5 - PLAYER_HEIGHT){
    	game.player.y += player_fall;//descendre
    }
    if(drapeaubis == 1 && drapeau == 0 && game.player.y>=canvas.height / 1.5 - PLAYER_HEIGHT){
        sprites.src = "./src/sprites/CJ_Runing/cj_running.png";
        etat = 0;
    	drapeaubis = 0;
    	degre = 0;
    }
    requestAnimationFrame(play);
}

document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById('canvas');
    game ={
        //variables concernant le joueur
        player:{
            y: canvas.height / 1.5 - PLAYER_HEIGHT
        },
        //variables concernant les obstacles
        obstacle: {
            x: canvas.width-OBSTACLE_RADIUS,
            y: canvas.height/1.5-OBSTACLE_RADIUS,
            r: OBSTACLE_RADIUS,
                speed: {
                    x: 5
                }
        }
        
    },
    
    animate();
    play();
});