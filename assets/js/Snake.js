

	class Snake {
		constructor (canvasContext, tileSize, Segment, gameController) {
			this.body           = [];
			this.Segment        = Segment;
			this.tileSize       = tileSize;
			this.direction      = undefined;
			this.canvasContext  = canvasContext;
			this.gameController = gameController;
			this.canvas         = canvasContext.canvas;

			this.restart();
		};

		changeDirection (keyCode) {
			var _body = this.body, head = _body[0], neck = _body[1];

			switch (keyCode) {
				case 38:
					return this.direction = (head.x !== neck.x && this.direction != 'up') ? 'up' : this.direction;
				case 37:
					return this.direction = (head.y !== neck.y && this.direction != 'left') ? 'left' : this.direction;
				case 40:
					return this.direction = (head.x !== neck.x && this.direction != 'down') ? 'down' : this.direction;
				case 39:
					return this.direction = (head.y !== neck.y && this.direction != 'right') ? 'right' : this.direction;
			};
		};

		update () {
			var _body = this.body, firstPiece = _body[0], newPiece = {}, tileSize = this.tileSize;

			switch (this.direction) {
				case 'up':
					newPiece.x = firstPiece.x;
					newPiece.y = (firstPiece.y > 0 ? firstPiece.y : this.canvas.height) - tileSize;
					break;
				case 'left':
					newPiece.y = firstPiece.y;
					newPiece.x = (firstPiece.x > 0 ? firstPiece.x : this.canvas.width) - tileSize;
					break;
				case 'right':
					newPiece.y = firstPiece.y;
					newPiece.x = firstPiece.x == this.canvas.width - tileSize ? 0 : firstPiece.x + tileSize;
					break;
				case 'down':
					newPiece.x = firstPiece.x;
					newPiece.y = firstPiece.y == this.canvas.height - tileSize ? 0 : firstPiece.y + tileSize;
			};

			var lastPiece = this.move(newPiece);

			if (this.hasCollided()) {
				this.gameController.score.decreaseLife();

				if (this.gameController.over)
					return this.stepBack(_body, lastPiece);

				this.restart();
			};
		};

		draw () {
			var { body:_body, Segment:Segment } = this;

			for (var i = 0, len = _body.length; i < len; i++) {
				var _piece = this.body[i];

				switch (_body.indexOf(_piece)) {
					case 0:
						Segment.head(_piece, _body[i + 1]);
						break;
					case (len - 1):
						Segment.tail(_piece, _body[len - 2]);
						break;
					default:
						Segment.body(_piece, _body[i - 1], _body[i + 1]);
				};
			};
		};

		move (newPiece) {
			var _body = this.body;

			_body.unshift(newPiece);

			return _body.splice(_body.length - 1, 1)[0];
		};

		ateFood () {
			var tail = this.body[this.body.length - 1];

			this.body.push({x: tail.x, y: tail.y});
		};

		hasCollided () {
			var head = this.body[0], currentMaze = this.gameController.maze, _self = this;

			return [_self, currentMaze].some(itens => itens.collide(head));
		};

		collide (head) {
			return this.body.some((_body, index) => index && (head.x == _body.x && head.y == _body.y));
		};

		stepBack (_body, lastPiece) {
			_body.push(lastPiece);
			_body.splice(0, 1);
		};

		restart () {
			this.body = [
				{ x: 30, y: 280 },
				{ x: 30, y: 290 },
				{ x: 30, y: 300 }
			];

			this.direction = 'up';
		};
	};

