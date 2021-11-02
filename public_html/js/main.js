'use strict';
var canvas;
var game;

var PLAYER_HEIGHT = 69;
var PLAYER_WIDTH = 34;

const OBSTACLE_HEIGHT = 90;
const OBSTACLE_WIDTH = 62;

const OBSTACLE_HEIGHTVOL = 16;
const OBSTACLE_WIDTHVOL = 23;

const GROUND_HEIGHT = 265;
const GROUND_WIDTH = 680;

const JUMP_HEIGHT = 275;
var player_fall = 5;
var degre = 170;

var drapeau = 0;
var drapeaubis = 0;
var verif1 = 0;
var verif2 = 0;
var isLittle = 0;

var pathPersoRun = "./images/CJ_Running.png";
var pathPersoJet = "./images/CJ_Jet.png";
var pathPersoLittle = "./images/CJ_Little.png";
var pathObstacleSol = "./images/Tentacules3.png";
var pathObstacleVol = "./images/Asteroid2.png";
var pathSol = "./images/Ground1.png";
var pathCiel = "./images/Sky220.png";
var pathPlanete1 = "./images/Planete1.png";
var pathPlanete2 = "./images/Planete2.png";
var pathStart = "./images/Start.png";
var pathRestart = "./images/Restart.png";
var pathGinked = "./images/Ginked.png";
var pathBlack = "./images/death_black.png";
var pathMute = "./images/Mute.png";
var pathUnmute = "./images/Unmute.png";
var pathSave = "./images/Save.png";
var pathText = "./images/Textfield.png";
var pathJson = "./score/score.json";
var pathPhp = "score.php";
var pathMusic = "./sounds/CJ_Song.mp3";
var pathGameOver = "./sounds/Game Over.mp3";


var sprites = new Image();
sprites.onload = animate;
sprites.src = pathPersoRun;
var step = 0;
var etat = 0;

var spritesObstaclesSol = new Image();
spritesObstaclesSol.onload = animate;
spritesObstaclesSol.src = pathObstacleSol;
var stepSol = 0;

var spritesObstaclesVol = new Image();
spritesObstaclesVol.onload = animate;
spritesObstaclesVol.src = pathObstacleVol;
var stepVol = 0;


var spritesSol = new Image();
spritesSol.src = pathSol;


var spriteCiel = new Image();
spriteCiel.onload = animate;
spriteCiel.src = pathCiel;
var stepCiel = 0;

var vivant = 1;

var score = 0;

var spritesPlanete2 = new Image();
spritesPlanete2.src = pathPlanete2;
var xP = 10;
var yP = 400;
var change = -1;
var rnd = 0;

var spriteStart = new Image();
spriteStart.src = pathStart;

var spriteRetry = new Image();
spriteRetry.src = pathRestart;

var spriteGinked = new Image();
spriteGinked.src = pathGinked;

var spriteBlack = new Image();
spriteBlack.src = pathBlack;

var spriteMute = new Image();
spriteMute.src = pathMute;

var spriteUnmute = new Image();
spriteUnmute.src = pathUnmute;

var spriteSend= new Image();
spriteSend.src = pathSave;

var spriteTextField= new Image();
spriteTextField.src = pathText;

var start = 0;

var scoreText="";
var pseudo ="";

var muted = false;
var myMusic; 
var gameOverSound;
var scoreSended = false;
/* Version 2 Code Here */
// ol element containing high scores
const List=document.getElementById("highscores");
// game submition form
const myform=document.getElementById("myform");
// element displaying error messages
const Errors=document.getElementById("error");

// Function to Reset Score and High Score List
function resetForm (){
	 // delete li elements holding high score data
	 scoreText = "";
	 // fetch scores.json and create new li elements holding the data
	 get_scores(list_scores);
}


function inJson (){
	 event.preventDefault(); 
	 var this_score=score; 
	 var formData = new FormData();
	 formData.append('name',pseudo);
	 formData.append('score', score);
	 
	 fetch (pathPhp,{
		 method: "post", 
		 body: formData 
	})
		 .then (function (response){
			 return response.text(); 
		})
		 .then(function(text){
			 resetForm(); 
		})
		 .catch(function (err){
			 Errors.innerHTML=err; 
		})
}

function get_scores (callback){
	 let file=pathJson;
	 fetch(file,{cache: "no-cache"}) 
 		 .then(function(response){
 			 if (response.status !==200){
 				 Errors.innerHTML=response.status;
 			}

 		 response.json().then(function(data){
 			 let scores=JSON.stringify(data);
 			 callback (scores);
 		})
 	})

 	.catch(function(err){
 		 Errors.innerHTML=err;
 	});
}


 var list_scores=function (scores){
 	 let object=JSON.parse(scores);
 	 for (let i=0; i<object.length; i++){
 		 var text=(i+1)+"-"+object[i].name + ":" + object[i].score;
 		 scoreText+=text+"\n";
 	}
}
function displayScores(){
	var context = canvas.getContext('2d');
	context.font = "15px Arial";
    context.fillStyle = 'white';
	var stk = new Array(5);
	var idx = 0;
	for(let i = 0; i<scoreText.length;i++){
		if(scoreText.charAt(i)=='\n'){
			stk[idx]=i;
			idx++;
		}
	}
	context.fillText(scoreText.substring(0,stk[0]), 500, 210);
	context.fillText(scoreText.substring(stk[0]+1,stk[1]), 500, 240);
	context.fillText(scoreText.substring(stk[1]+1,stk[2]), 500, 270);
	context.fillText(scoreText.substring(stk[2]+1,stk[3]), 500, 300);
	context.fillText(scoreText.substring(stk[3]+1,stk[4]), 500, 330);
}



function init(tabSol,tabVol){
	PLAYER_HEIGHT = 69;
	player_fall = 5;
	degre = 170;
	drapeau = 0;
	drapeaubis = 0;
	verif1 = 0;
	verif2 = 0;
	isLittle = 0;
	step = 0;
	etat = 0;
	stepSol = 0;
	stepVol = 0;
	stepCiel = 0;
	vivant = 1;
	score = 0;
	start = 0;
	scoreSended = false;
	sprites.src = pathPersoRun;
	game.player.y = canvas.height / 1.5 - PLAYER_HEIGHT + 10;
	for(var i = 0; i<tabSol.length; i++){
		tabSol[i].x = canvas.width-OBSTACLE_WIDTH + (i*500);
	}
	var stk2;
	for(var i = 0; i<tabVol.length; i++){
			stk2 = Math.random()*(3);
			if(stk2<1){
				tabVol[i].y =canvas.height / 1.5 - PLAYER_HEIGHT+5;
			}else if(stk2>=1 && stk2<2){
				tabVol[i].y =0 + 70;
			}else{
				tabVol[i].y =canvas.height / 1.5 - PLAYER_HEIGHT+5;
			}
			tabVol[i].x = canvas.width-OBSTACLE_WIDTH+((i+1)*700);
			tabVol[i].speed.x = 0;
	}
	yP=400;
	xP=10;
	change = -1;
	rnd = Math.floor(Math.random() * 2);
	if(rnd==0){
		spritesPlanete2.src = pathPlanete2;
	}else{
		spritesPlanete2.src = pathPlanete1;
	}
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
		this.sound.currentTime = 0;
	}
}



function draw(tabSol, tabVol) {
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
    //Terrain
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawSky(0,0,Math.floor(stepCiel));
    //Decord
	drawPlanete();
    drawSol(game.ground1.x,game.ground1.y);
    drawSol(game.ground2.x,game.ground2.y);
    //Joueur
    drawPerso(20,game.player.y, Math.floor(step));
    drawBar(degre);

    //Obstacle
    if(start!=0){
    	for(var i = 0; i<tabSol.length; i++){
    		drawObstacleSol(tabSol[i].x,tabSol[i].y,Math.floor(stepSol));
    		drawObstacleVol(tabVol[i].x,tabVol[i].y,Math.floor(stepVol));

    	}
    }
    context.font = "30px Arial";
    context.fillStyle = 'white';
    context.fillText(score, 600, 30);
    if(start == 0){
    	drawStart();
   		if(muted){
			drawUnmute();
    	}else{
			drawMute();
    	}
    }else if(start == 1 && vivant == 0){
    	drawBlack();

    	if(muted){
			drawUnmute();
    	}else{
			drawMute();
    	}
    	drawSend();
    	drawRetry();
    	drawGinked();
    	displayScores();
    	context.font = "30px Arial";
    	drawTextField();
    	context.fillText(pseudo, 290, 340);
    }
}
function drawPerso(x,y,step){
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	if(etat == 0){
		context.drawImage(sprites,34*step,0,34,72,x,y,34,72);
	}else if(etat == 1){
		context.drawImage(sprites,29*step,0,29,63,x,y,29,63);

	}else if(etat == 2){
		context.drawImage(sprites,27*step,0,27,48,x,y,27,48);
	}
}

function drawObstacleSol(x,y,stepSol){
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.drawImage(spritesObstaclesSol,76*stepSol,0,76,94,x,y,76,94);
}

function drawObstacleVol(x,y,stepVol){
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.drawImage(spritesObstaclesVol,31*stepVol,0,31,16,x,y,31,16);
}

function drawSol(x,y){
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.drawImage(spritesSol,x,y);
}

function drawSky(x,y,stepCiel){
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.drawImage(spriteCiel,680*stepCiel,0,680,250,x,y,680,250);
}
function drawBar(degre){
	var context = canvas.getContext('2d');
	context.fillStyle = 'white';
	context.fillRect(0, 450, 100, 15);
	context.fillStyle = 'green';
	var percent = ((degre-170)/(JUMP_HEIGHT-170))*90;
	context.fillRect(5,453,percent,9)
}
function drawStart(){
	var context = canvas.getContext('2d');
	context.drawImage(spriteStart,200,173,286,77);
}
function drawGinked(){
	var context = canvas.getContext('2d');
	context.drawImage(spriteGinked,200,123,273,67);
}
function drawRetry(){
	var context = canvas.getContext('2d');
	context.drawImage(spriteRetry,0,0,777,769,280,193,100,100);
}

function drawBlack(){
	var context = canvas.getContext('2d');
	context.drawImage(spriteBlack,0,0,680,520);
}

function drawMute(){
	var context = canvas.getContext('2d');
	context.drawImage(spriteMute,0,0,56,56,0,0,50,50);
}

function drawUnmute(){
	var context = canvas.getContext('2d');
	context.drawImage(spriteUnmute,0,0,56,56,50,0,50,50);
}

function drawSend(){
	var context = canvas.getContext('2d');
	context.drawImage(spriteSend,0,0,46,47,365,305,46,47);
}

function drawTextField(){
	var context = canvas.getContext('2d');
	context.drawImage(spriteTextField,0,0,84,47,280,305,84,47);
}

function drawPlanete(){
	var context = canvas.getContext('2d');
	if(rnd == 0){
		context.drawImage(spritesPlanete2,0,0,79,79,xP,yP,79,79);
	}else if(rnd == 1){
		context.drawImage(spritesPlanete2,0,0,207,159,xP,yP,207,159);
	}
}

function update(){
	if(etat == 0){
		step+= 0.07;
		if(step >= 2){step -= 2;}
	}

	if(etat == 1){
		step += 0.01;
		if(step >= 2){step -=2;}
	}

	if(etat == 2){
		step +=0.05;
		if(step>=2){step -=2;}
	}
	stepSol += 0.05;
	if(stepSol>=4){stepSol -= 4;}
	stepCiel +=0.04;
	if(stepCiel>=2){stepCiel -= 2;}
	stepVol +=0.05;
	if(stepVol>=2){stepVol -= 2;}
	if((yP<=222 && yP>90)){
		xP+= 0.4;
	}else if((yP<=90 && yP>10)){
		xP+= 0.8;
	}else if((yP<=10)){
		xP+= 1;
	}else{
		xP+= 0.2;
	}
	if(change==-1){
		yP-= 0.8;
	}else if(change==1){
		yP+= 0.8;
	}else if(change==0){
		yP+=0;
	}
	if(xP>=300 && xP<=303){
		change = 0;
	}else if(xP>303){
		change = 1;
	}

	if(yP>=500){
		yP=400;
		xP=10;
		change = -1;
		rnd = Math.floor(Math.random() * 2);
		if(rnd==0){
			spritesPlanete2.src = pathPlanete2;
		}else{
			spritesPlanete2.src = pathPlanete1;
		}
	}
}

function animate(tabSol, tabVol){
	draw(tabSol, tabVol);
	update();
}

function death(tabSol, tabVol){
	for(var i = 0; i<tabSol.length; i++){
		if(game.player.y + PLAYER_HEIGHT> tabSol[i].y && 
			game.player.y < tabSol[i].y + OBSTACLE_HEIGHT && 
			20< tabSol[i].x+OBSTACLE_WIDTH && 49> tabSol[i].x){
			gameOverSound.play();
		vivant = 0;
		myMusic.stop();
	}
}
	for(var i = 0; i<tabVol.length; i++){
		if(game.player.y + PLAYER_HEIGHT> tabVol[i].y && 
			game.player.y < tabVol[i].y + OBSTACLE_HEIGHTVOL && 
			20< tabVol[i].x+OBSTACLE_WIDTHVOL && 49> tabVol[i].x){
				gameOverSound.play();
				vivant = 0;
				myMusic.stop();
		}
	}
}

function little(e){
	if(e.keyCode == 40 && vivant == 1){
		if(game.player.y>=canvas.height/1.5 - 69){
			PLAYER_HEIGHT = 48;
			game.player.y = canvas.height / 1.5 - PLAYER_HEIGHT + 10;
			sprites.src = pathPersoLittle;
			etat = 2;
		}
		isLittle = 1;
		player_fall = 15;

		document.addEventListener('keyup', e => {
			if(vivant == 1){
				PLAYER_HEIGHT = 69;
				if(game.player.y>=canvas.height/1.5 - 69){
					game.player.y = canvas.height / 1.5 - PLAYER_HEIGHT + 10;
					sprites.src = pathPersoRun;
					etat = 0;
				}else{
					sprites.src = pathPersoJet;
					etat = 1;
				}
				player_fall = 5;
				isLittle = 0;
			}

		});	
	}
}

function detectJump(e){
	if(drapeaubis == 0 && (e.keyCode == 32 || e.keyCode == 38) && vivant == 1){
		degre += 15;
		verif1 = 1;
		document.addEventListener('keyup', e => {
			if(vivant == 1){
				verif2 = 1;
				drapeaubis = 1;
			}
		});
	}
}

function jump(){
	
	if(verif1 == 1 && verif2 == 1){
		etat = 1;
		drapeau = 1;
		sprites.src = pathPersoJet;
		verif1 = 0;
	}
    //On impose une limite de saut
    if(degre>JUMP_HEIGHT){
    	degre = JUMP_HEIGHT;
    }
    if(degre<=170){
    	degre = 170;
    }
    //On fait sauter le joueur si le joueur à relacher le saut et si Jack est en dessous de la hauteur de saut
    if(drapeau == 1 && game.player.y>= canvas.height / 1.5 - PLAYER_HEIGHT + 10 - degre){
    	game.player.y -= 7.5;//monter
    }

    //Si le personnage est inférieur 
    if(drapeau == 1 && game.player.y < canvas.height / 1.5 - PLAYER_HEIGHT + 10 - degre){
    	drapeau = 0;
    }
    //On le fait tomber
    if(drapeau == 0 && game.player.y<canvas.height / 1.5 - PLAYER_HEIGHT + 10){
    	game.player.y += player_fall;//descendre
    }
    if(drapeaubis == 1 && drapeau == 0 && game.player.y>=canvas.height / 1.5 - PLAYER_HEIGHT + 10){
    	if(isLittle == 1){
    		PLAYER_HEIGHT = 48;
    		game.player.y = canvas.height / 1.5 - PLAYER_HEIGHT + 10; 
    		sprites.src = pathPersoLittle;
    		step = 0;
    		etat = 2;

    	}else{
    		sprites.src = pathPersoRun;
    		etat = 0;
    	}
    	drapeaubis = 0;
    	degre = 0;
    	verif2 = 0;
    }
}

function movement(){
	if(vivant == 1){
		onkeydown = function(e){
			little(e);
			detectJump(e);
			planer(e);
		}
		jump();
	}
}

function planer(e){
	if(e.keyCode == 39 || e.keyCode == 37){
		player_fall = 3;
	}
	document.addEventListener('keyup', e => {
		player_fall = 5;
	});
}

function obstaclesRetour(tabSol,tabVol){
	var stk1;
	for(var i = 0; i<tabSol.length; i++){
		if(tabSol[i].x<=-500){
			stk1 = 1350;
			tabSol[i].x = stk1;
		}
	}
	var d = 1;
	for(var e = 0; e<tabVol.length; e++){
		if(tabVol[e].x>-500){
			d=0;
		}
	}

	var stk2;
	for(var a = 0; a<tabVol.length; a++){
		if(d==1){
			stk2 = Math.random()*(3);
			if(stk2<1){
				tabVol[a].y =canvas.height / 1.5 - PLAYER_HEIGHT + 5;
			}else if(stk2>=1 && stk2<2){
				tabVol[a].y = 0 + 70;
			}else{
				tabVol[a].y =canvas.height / 1.5 - PLAYER_HEIGHT + 5;
			}
			tabVol[a].x = canvas.width-OBSTACLE_WIDTH+(a+1)*700;
		}
	}
}

function play(){
	var tabSol = [game.obstacle1, game.obstacle2, game.obstacle3, game.obstacle4];
	var tabVol = [game.obstacleVol1, game.obstacleVol2, game.obstacleVol3, game.obstacleVol4];
	if(start == 1){
		if(vivant == 1){
			for(var i = 0; i<tabSol.length; i= i+1){
				tabSol[i].x -= tabSol[i].speed.x;	
			}
			for(var a = 0; a<tabVol.length; a= a+1){
				tabVol[a].x -= tabVol[a].speed.x;	
			}

			if(game.ground1.x<=-856){
				game.ground1.x = 856;
			}
			if(game.ground2.x<=-856){
				game.ground2.x = 856;
			}
			if(score==1000){
				for(var a = 0; a<tabVol.length; a++){
					tabVol[a].speed.x = 7;
				}
			}
			game.ground1.x -= game.obstacle1.speed.x;
			game.ground2.x -= game.obstacle1.speed.x;
			movement();
			animate(tabSol, tabVol);
			obstaclesRetour(tabSol, tabVol);
			death(tabSol, tabVol);
			score++;
		}
	}else if(start == 0){
		menu(tabSol,tabVol);
		draw(tabSol, tabVol);
	}
	if(vivant==0){
		deathMenu(tabSol, tabVol);
		draw(tabSol, tabVol);
	}
	requestAnimationFrame(play);
}

function menu(tabSol,tabVol){
	var rect = canvas.getBoundingClientRect();
	mute();
	document.addEventListener('click', event => {
		if(vivant == 1 && start == 0){
			var posX = (event.clientX - rect.left);
			var posY = (event.clientY - rect.top);
			if( 173 <= posY && 
				173+77 >= posY &&
				200<= posX &&
				200+286 >= posX){
				init(tabSol,tabVol);
				start = 1;
				if(!muted){
					myMusic.play();
				}
		}
	}
});
	onkeydown = function(e){
		if(e.keyCode == 13 && vivant == 1){
			document.addEventListener('keyup', e => {
				if(vivant == 1 && start == 0){
					init(tabSol,tabVol);
					start = 1;
					if(!muted){
						myMusic.play();
					}
				}
			});
		}
	}
}

function deathMenu(tabSol,tabVol){
	var rect = canvas.getBoundingClientRect();
	mute();
	document.addEventListener('click', event => {
		if(vivant == 0){
			var posX = (event.clientX - rect.left);
			var posY = (event.clientY - rect.top);
			if( 193 <= posY && 
				193+100 >= posY &&
				280<= posX &&
				280+100 >= posX){
					init(tabSol,tabVol);
					start = 1;
					if(!muted){
						myMusic.play();
					}
			}
			//365,305
			if( 305 <= posY && 
				305+50 >= posY &&
				365<= posX &&
				365+50 >= posX){
				console.log("oui");
					if(!scoreSended){
						if(pseudo.length==3){
							inJson();
							scoreSended = true;
						}
					}
			}

	}
});
	onkeydown = function(e){
		if(vivant==0 && ((e.keyCode>=65 && e.keyCode<=90) || e.keyCode == 8)){
			if(e.keyCode>=65 && e.keyCode<=90 && pseudo.length<3){
				pseudo += String.fromCharCode(e.keyCode);
			}else if(e.keyCode == 8 && pseudo.length>0){
				pseudo = pseudo.substring(0,pseudo.length-1);
			}
		}
		if(e.keyCode == 13 && vivant == 0){
			document.addEventListener('keyup', e => {
				if(vivant == 0){
					init(tabSol,tabVol);
				}
			});
		}
	}
}

function mute(){
	var rect = canvas.getBoundingClientRect();
	document.addEventListener('click', event => {
		if(vivant == 0 || (start == 0 && vivant == 1)){
			var posX = (event.clientX - rect.left);
			var posY = (event.clientY - rect.top);
			if( 0 <= posY && 
				0+50 >= posY &&
				0<= posX &&
				0+50 >= posX && !muted){
				if(!muted){
					muted = true;
					console.log("Muted");
				}
			}else if( 0 <= posY && 
				0+50 >= posY &&
				50<= posX &&
				50+50 >= posX && muted){
				if(muted){
					muted = false;
					console.log("Unmuted");
				}
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', function () {
	myMusic = new sound(pathMusic);
	myMusic.sound.loop = true;
	gameOverSound = new sound(pathGameOver);
	canvas = document.getElementById('canvas');
	game ={
        //variables concernant le joueur
        player:{
        	y: canvas.height / 1.5 - PLAYER_HEIGHT + 10
        },
        //variables concernant les obstacles
        obstacle1: {
        	x: canvas.width-OBSTACLE_WIDTH,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT + 10,
        	speed: {
        		x: 4
        	}
        },
        obstacle2: {
        	x: canvas.width-OBSTACLE_WIDTH+500,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT + 10,
        	speed: {
        		x: 4
        	}
        },
        obstacle3: {
        	x: canvas.width-OBSTACLE_WIDTH+1000,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT + 10,
        	speed: {
        		x: 4
        	}
        },
        obstacle4: {
        	x: canvas.width-OBSTACLE_WIDTH+1500,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT + 10,
        	speed: {
        		x: 4
        	}
        },
        obstacleVol1: {
        	x: canvas.width-OBSTACLE_WIDTH+700,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT - 100,
        	speed: {
        		x: 0
        	}
        },
        obstacleVol2: {
        	x: canvas.width-OBSTACLE_WIDTH+1400,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT - 100,
        	speed: {
        		x: 0
        	}
        },
        obstacleVol3: {
        	x: canvas.width-OBSTACLE_WIDTH+2100,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT - 100,
        	speed: {
        		x: 0
        	}
        },
        obstacleVol4: {
        	x: canvas.width-OBSTACLE_WIDTH+2800,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT - 100,
        	speed: {
        		x: 0
        	}
        },
        ground1:{
        	x:0,
        	y:canvas.height / 1.5
        },
        ground2:{
        	x:856,
        	y:canvas.height / 1.5
        }

    },
    play();
});