(function () {

	var canvas, ctx, tileSize = 10, Sprites;

	var container = document.getElementById('container');

	var snake, food, maze, game, screens, maze;

	var dropCounter = 0, dropInterval = 100, lastUpdate = 0, delta;


	function createCanvas (w, h) {
		canvas = document.createElement('canvas');
		canvas.width  = w;
		canvas.height = h;
		canvas.textContent = 'navegador sem suporte';

		container.appendChild(canvas);

		ctx = canvas.getContext('2d');

		[Sprite.prototype.canvas, Sprite.prototype.canvasContext, Sprite.prototype.tileSize] = [canvas, ctx, tileSize];

		setInputs();

		setSprites();

		requestAnimationFrame(update, canvas);
	}


	function setSprites () {
		Sprites = {
			snake: {
				head: {
					up:    new Sprite(snake_graphics, 193, 1, 61, 61),
					left:  new Sprite(snake_graphics, 193, 65, 61, 61),
					right: new Sprite(snake_graphics, 257, 1, 61, 61),
					down:  new Sprite(snake_graphics, 257, 65, 61, 61)
				},

				body: {
					vertical:   new Sprite(snake_graphics, 133, 66, 54, 53),
					horizontal: new Sprite(snake_graphics, 62, 5, 53, 54)
				},

				curve: {
					UL: new Sprite(snake_graphics, 133, 133, 53, 53), // Up Left
					UR: new Sprite(snake_graphics, 5, 69, 53, 53),    // Up Right
					DL: new Sprite(snake_graphics, 133, 5, 53, 53),   // Down Left
					DR: new Sprite(snake_graphics, 5, 5, 53, 53)      // Down Right
				},

				tail: {
					up:    new Sprite(snake_graphics, 197, 127, 53, 60),
					left:  new Sprite(snake_graphics, 191, 197, 60, 53),
					right: new Sprite(snake_graphics, 260, 133, 60, 53),
					down:  new Sprite(snake_graphics, 261, 196, 53, 60)
				}
			},

			food: {
				apple: new Sprite(snake_graphics, 3, 193, 57, 62)
			},

			wall: {
				white: new Sprite(maze_graphics, 3, 8, 61, 65)
			},

			heart: {
				full:  new Sprite(heart_graphics, 0, 15, 97, 87),
				empty: new Sprite(heart_graphics, 595, 15, 97, 87)
			},

			game: {
				pause:  new Sprite(pause_graphics, 0, 0, 600, 600, tileSize),
				over:   new Sprite(over_graphics, 0, 0, 356, 91, tileSize),
				splash: new Sprite(splash_graphics, 0, 0, 216, 154, tileSize)
			}
		};

		maze = new mazeManager(allMazes, Sprites.wall);

		game  = new Controller(
			new Score(Sprites.heart), new Screens(Sprites.game, ctx), maze
		);

		snake =	new Snake(
			ctx, tileSize, new Segment(Sprites.snake), game
		);

		food  = new Food(
			Sprites.food, snake
		);

		let url = "http://mineapps.000webhostapp.com/get_data.php?gamename=Snake Game", record;

		let xhr = new XMLHttpRequest();

		xhr.open('GET', url, 1);

		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function () {
			if (xhr.status === 200) {
				try {
					let returned = JSON.parse(xhr.responseText);

					game.record.record = JSON.stringify({'name':returned.playername,'score':returned.playerscore});

					localStorage.setItem('snakeRecord', game.record.record);
				} catch (e) {
					game.record.record = localStorage.getItem('snakeRecord') || undefined;
				}
			}
		}

		xhr.send();
	}


	function random (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}


	function map (value, min1, max1, min2, max2) {
		return min2 + (max2 - min2) * ((value - min2) / (max1 - min1));
	}


	function clearCanvas (newColor = 'white') {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawRect(0, 0, canvas.width, canvas.height, newColor);
	}


	function drawRect (x, y, w, h, color) {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, w, h);
	}


	function drawArc (x, y, r, init = 0, end = Math.PI * 2, color) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = color;
		ctx.arc(x, y, r, init, end);
		// ctx.closePath();
		ctx.stroke();
	}


	function verticalGradient (xGrad, yGrad, wGrad, hGrad, colorSet) {
		var gradient = ctx.createLinearGradient(xGrad, yGrad, wGrad, hGrad);

		gradient.addColorStop(0, colorSet.beg);
		gradient.addColorStop(1, colorSet.end);

		return gradient;
	}


	function fillBackground (scheme = 'white') {
		drawRect(0, 0, canvas.width, canvas.height, scheme);
	}


	function loadImage (...files) {
		for (var i = 0, len = files.length, images = []; i < len; i++) {
			var image = new Image();
			image.src = files[i];
			images.push(image);
		}
		
		return images;
	}


	function draw () {
		clearCanvas();

		game.running ? [maze, food, snake, game.score].forEach(itens => itens.draw()) : game.screens.splash();

		if (game.paused || game.over) {
			var grad = verticalGradient(0, 0, 0, canvas.height, { beg: 'rgba(0, 0, 0, .2)', end: 'rgba(0, 0, 0, .8)' });

			drawRect(0, 0, canvas.width, canvas.height, grad);

			game.draw();
		}
	}


	function update (time = 0) {
		delta = time - lastUpdate, lastUpdate = time;
		
		dropCounter += delta;
		if (dropCounter >= dropInterval) {

			if (game.running) {
				!(game.paused || game.over) && [food, snake].forEach(itens => itens.update());
			}

			draw();

			dropCounter = 0;
		}

		requestAnimationFrame(update, canvas);
	}


	function resetGame () {
		[game, snake, food].forEach(itens => itens.restart());
	}


	function clickCanvas (event) {
		if (game.over) {
			return resetGame();
		}

		game.setGameState();
	}


	function keydownCanvas (event) {
		var keyCode = event.keyCode;

		switch (keyCode) {
			case 80: // P key
				game.togglePause();
				break;
			case 32:
				return !game.running && !game.paused && game.setGameState();
			case 37: // left arrow
			case 38: // up arrow
			case 39: // right arrow
			case 40: // down arrow
			case 65: // A letter
			case 87: // W letter
			case 83: // S letter
			case 68: // D letter
				return (!game.over && !game.paused && game.running) && snake.changeDirection(keyCode);
		}
	}


	function setInputs () {
		canvas.addEventListener('click', clickCanvas, false);
		document.addEventListener('keydown', keydownCanvas, false);
	}


	window.onload = createCanvas(480, 480);
} ());
