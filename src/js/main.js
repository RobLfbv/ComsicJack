'use strict';
var canvas;
var game;
var drapeau = 0;
var degres = 0;
const PLAYER_HEIGHT = 30;
const PLAYER_WIDTH = 30;
const OBSTACLE_RADIUS = 20;
const JUMP_HEIGHT = 130;
function draw() {
    var context = canvas.getContext('2d');
    //Terrain
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height/1.5);
    //Joueur
    context.fillStyle = 'blue';
    context.fillRect(50, game.player.y,PLAYER_HEIGHT,PLAYER_WIDTH);

    //Obstacle
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(game.obstacle.x, game.obstacle.y, game.obstacle.r, 0, Math.PI*2, false);
    context.fill();
}
function play(){
    game.obstacle.x -= game.obstacle.speed.x;
    onkeypress = function(e){
        if(e.charCode == 32){
            degres += 1;
            drapeau = 1;
        }
    }
    if(drapeau == 1 && game.player.y>=canvas.height / 1.5 - PLAYER_HEIGHT - JUMP_HEIGHT){
        game.player.y -= 8;
    }else{
        drapeau = 0;
    }
    if(game.player.y <= canvas.height / 1.5 - PLAYER_HEIGHT && drapeau == 0){
        game.player.y += 5;
    }
    draw();

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
                    x: 2
                }
            
        }
    }
    draw();
    play();
});