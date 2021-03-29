
let scoreBlock; //Отображение на странице очков
scoreBlock = document.querySelector('.game-score .score-count')
let score = 0; //Очки


const config = {
	step: 0,
	maxStep: 4,
	sizeBox: 32,
	sizeFood: 32/3
} 

const snake = {
	x: 32,
	y: 32,
	dx: config.sizeBox,
	dy: 0,
	body: [],
	maxBody: 3,
}

let food = {
	x: 0,
	y: 0,
}

FoodSounds = () =>{
	let foodSound = new Audio();
		foodSound.src = 'sound/eatFood.mp3';
		console.log('ЗВУК ДОЛЖЕН ЕБОШИТЬ!!!!')
}

let canvas = document.querySelector('#game-canvas');
let ctx = canvas.getContext('2d');
// drawScore();
drawScore = () =>{
	scoreBlock.innerHTML = score;
};
drawScore();


let gameLoop = () =>{
	
	requestAnimationFrame(gameLoop);
	if (++config.step < config.maxStep) {
		return;
	}
	config.step = 0;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawFood();
	drawSnake();
};	

requestAnimationFrame(gameLoop);

drawSnake = () =>{
	snake.x += snake.dx;
	snake.y += snake.dy;

	boundaries();

	snake.body.unshift({x: snake.x, y: snake.y});
	if (snake.body.length > snake.maxBody) {
		snake.body.pop();
	};

	snake.body.forEach((el, index) =>{
		if(index === 0) {
			ctx.fillStyle = '#04BF55'
		} else {
			ctx.fillStyle = '#05F26C'
		}
		ctx.fillRect(el.x, el.y, config.sizeBox, config.sizeBox);

		if ( el.x === food.x && el.y === food.y ) {
			snake.maxBody++;
			incScore();
			randomPositionFood();
			
			
			console.log('ВСЕ РОБИТ!')
		} else {
			console.log('ВСЕ СЛОМАЛОСЬ НАХУЙ!')
		}
		// snake.body.forEach((el, index) =>{
		// 	if (el.x === index.x && el.y === index.y){
		// 		refreshGame();
		// 		console.log("ОООН ВВВВИИИИЖИИИИТ ЭТОООО!!!!")
		// 	} 
		// });

		for( let i = index + 1; i < snake.body.length; i++ ) {

			if ( el.x == snake.body[i].x && el.y == snake.body[i].y ) {
				refreshGame();
			}
		}
	});
};

boundaries = () =>{
	if (snake.x < 0) {
		snake.x = canvas.width - config.sizeBox
	} else if (snake.x >= canvas.width){
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = canvas.height - config.sizeBox
	} else if (snake.y >= canvas.height){
		snake.y = 0;
	}
};



refreshGame = () =>{
	score = 0;
	drawScore();

	snake.x = 160;
	snake.y = 160;
	snake.body = [];
	snake.maxBody = 3;
	snake.dx = config.sizeBox;
	snake.dy = 0;
	randomPositionFood();
};

drawFood = () =>{
	ctx.beginPath();
	ctx.fillStyle = "#D0E9F2";
	ctx.arc( food.x + (config.sizeBox / 2 ), food.y + (config.sizeBox / 2 ), config.sizeFood, 0, 2 * Math.PI );
	ctx.fill();
};


randomPositionFood = () =>{
	food.x = Math.floor((Math.random() * canvas.width / config.sizeBox)) * config.sizeBox;
	food.y = Math.floor((Math.random() * canvas.height / config.sizeBox)) * config.sizeBox;
};

incScore = () =>{
	score++;
	drawScore();
};



// function getRandomInt(min, max) {
// 	return Math.floor( Math.random() * (max - min) + min );
// }
// getRandomInt= () =>{
// 	return Math.floor( Math.random() * (max - min) + min );

// };

document.addEventListener(('keydown'), (e) =>{
	let dir;
	if (e.code === 'KeyW'){
		snake.dy = -config.sizeBox;
		snake.dx = 0;

		
	} else if (e.code === 'KeyA' ){
		snake.dx = -config.sizeBox;
		snake.dy = 0;
	
	} else if (e.code === 'KeyS' ){
		snake.dy = config.sizeBox;
		snake.dx = 0;
		
	} else if (e.code === 'KeyD' ){
		snake.dx = config.sizeBox;
		snake.dy = 0;
		
	}
});




