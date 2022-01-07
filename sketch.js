var caminho;
var menino;
var dinheiro;
var diamante;
var joia;
var espada;
var Tesouros= 0;
var caminho_image;
var menino_image;
var dinheiro_image;
var diamante_image;
var joia_image;
var espada_image;
var grupodedinheiro;
var grupodediamante;
var grupodejoia;
var grupodeespada;

//criando estados do jogo
var PLAY= 1;
var GAMEROVER= 0;
var estadoJogo= 1;

function preload () {
caminho_image= loadImage ("Road.png");
dinheiro_image= loadImage ("cash.png");
diamante_image= loadImage ("diamonds.png");
joia_image= loadImage ("jwell.png");
espada_image= loadImage ("sword.png");

menino_image= loadAnimation ("Runner-1.png","Runner-2.png");
}

function setup () {
createCanvas (windowWidth,windowHeight);

//fazendo o fundo entrar em movimento
caminho= createSprite (width/2,200);
caminho.addImage (caminho_image);
caminho.velocityY= 5;

//carregando a animacao do menino
menino= createSprite (width/2,height-20,20,20);
menino.addAnimation ("SahilRunning",menino_image);
menino.scale= 1.0;

//criando o grupo das variaveis
grupodediamante= new Group ();
grupodedinheiro= new Group ();
grupodeespada= new Group ();
grupodejoia= new Group ();
}

function draw () {
    background (0);

//criando o estado de jogo JOGAR
if (estadoJogo===PLAY) {
menino.x= World.mouseX;

//criando as bordas
bordas= createEdgeSprites ();
menino.collide (bordas);

//reiniciando o fundo
if(caminho.y > height ){ 
caminho.y = height/2; 
}

//criando a funcao dos grupos
criarDiamante ();
criarDinheiro ();
criarEspada ();
criarJoia ();

//fazendo com que as variaveis se destruam assim que o menino colidir nelas, evitando vazamento de memoria
if (grupodediamante.isTouching(menino)) {
grupodediamante.destroyEach ();
Tesouros= Tesouros+100;
}

else if (grupodedinheiro.isTouching(menino)) {
grupodedinheiro.destroyEach ();
Tesouros= Tesouros+50;
}

else if (grupodejoia.isTouching(menino)) {
grupodejoia.destroyEach ();
Tesouros= Tesouros+150;
}

else if (grupodeespada.isTouching(menino)) {
grupodeespada.destroyEach ();
estadoJogo= GAMEROVER;

menino.x=width/2;
menino.y=height/2;
menino.scale= 0.05;

//velocidade das variaveis
grupodeespada.destroyEach ();
grupodediamante.destroyEach ();
grupodedinheiro.destroyEach ();
grupodejoia.destroyEach ();

grupodediamante.setVelocityYEach (0); 
grupodedinheiro.setVelocityYEach (0);
grupodeespada.setVelocityYEach (0);
grupodejoia.setVelocityYEach (0);
}

}
drawSprites ();
textSize (20);
fill (255);
text("Tesouros: "+ Tesouros,width-150,30);
}

//chamando as funcoes das variaveis
function criarDiamante () {
if (World.frameCount % 320== 0) {
var diamante= createSprite (Math.round(random(50, width-50),40, 10, 10));
diamante.addImage (diamante_image);
diamante.scale= 0.03;
diamante.velocityY= 3;
diamante.lifetime= 150;
grupodediamante.add(diamante);
}
}

function criarDinheiro () {
if (World.frameCount % 200== 0) {
var dinheiro= createSprite (Math.round(random(50, width-50),40, 10, 10));
dinheiro.addImage (dinheiro_image);
dinheiro.scale= 0.12;
dinheiro.velocityY= 3;
dinheiro.lifetime= 150;
grupodedinheiro.add (dinheiro);
}
}

function criarEspada () {
if (World.frameCount % 530== 0) {
var espada= createSprite (Math.round(random(50, width-50),40, 10, 10));
espada.addImage (espada_image);
espada.scale= 0.1;
espada.velocityY= 3;
espada.lifetime= 150;
grupodeespada.add (espada);
}
}

function criarJoia () {
if (World.frameCount % 410== 0) {
var joia= createSprite (Math.round(random(50, width-50),40, 10, 10));
joia.addImage (joia_image);
joia.scale= 0.13;
joia.velocityY= 3;
joia.lifetime= 150;
grupodejoia.add (joia);
}
}