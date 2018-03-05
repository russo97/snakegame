

	class Food {
		constructor (Sprites, snake) {
			this.maxFoods       = 2;
			this.foods          = [];
			this.snake          = snake;
			this.Sprites        = Sprites;
			this.gameController = snake.gameController;

			this.update();
		};

		update () {
			var snake_head = this.snake.body[0], removeIndex = [];

			this.foods.forEach((food, index) => {
				if (food.x == snake_head.x && food.y == snake_head.y) {
					removeIndex.push(index);
				};
			});

			removeIndex.length && Food.removeByIndex.call(this, removeIndex);

			while (this.foods.length < this.maxFoods) this.increaseFood();
		};

		draw () {
			var Sprites = this.Sprites, tileSize = this.Sprites.apple.tileSize;

			for (var i = 0, len = this.foods.length; i < len; i++) {
				var food = this.foods[i];

				Sprites.apple.draw(food.x, food.y, tileSize, tileSize);
			};
		};

		increaseFood () {
			var xPos, yPos, tileSize = this.Sprites.apple.tileSize;

			var last_w = this.Sprites.apple.canvas.width - tileSize,
				last_h = this.Sprites.apple.canvas.height - tileSize;

			while (!(xPos && yPos) || Food.foodCollide.call(this, { x: xPos, y: yPos })) {
				xPos = Food.random(0, last_w, tileSize);
				yPos = Food.random(0, last_h, tileSize);
			};

			this.foods.push({ x: xPos, y: yPos });
		};

		static foodCollide (theFood) {
			var snake = this.snake.body, foods = this.foods, maze = this.gameController.maze;

			return (
				snake.some(part => theFood.x === part.x && theFood.y === part.y) ||
				foods.some(food => theFood.x === food.x && theFood.y === food.y) || maze.collide(theFood)
			);
		};

		restart () {
			this.foods = [];

			while (this.foods.length < this.maxFoods) this.increaseFood();
		};

		static removeByIndex (removeList) {
			while (removeList.length) {
				this.foods.splice(removeList.shift(), 1);

				this.gameController.score.increaseScore();

				this.snake.ateFood();
			};
		};

		static random (min, max, base) {
			var rand = Math.floor(Math.random() * (max - min + 1) + min);

			return rand % base ? rand - (rand % base) : rand;
		};
	};


