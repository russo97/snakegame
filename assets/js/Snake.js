

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
		}

		changeDirection (keyCode) {
			var _body = this.body, head = _body[0], neck = _body[1];
			
			var UP    = 'up',
			    LEFT  = 'left',
			    RIGHT = 'right',
			    DOWN  = 'down';

			let newDirection = {
				38: UP,
				87: UP,
				65: LEFT,
				37: LEFT,
				39: RIGHT,
				68: RIGHT,
				40: DOWN,
				83: DOWN
				
			}[keyCode], currentDirection = this.direction;

			switch (keyCode) {
				case 38:
					if (head.x !== neck.x && currentDirection != 'down') {
						this.direction = newDirection;
					}
					break;
				case 37:
					if (head.y !== neck.y && currentDirection != 'right') {
						this.direction = newDirection;
					}
					break;
				case 40:
					if (head.x !== neck.x && currentDirection != 'up') {
						this.direction = newDirection;
					}
					break;
				case 39:
					if (head.y !== neck.y && currentDirection != 'left') {
						this.direction = newDirection;
					}
					break;
			}
		}

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
			}

			var lastPiece = this.move(newPiece);

			if (this.hasCollided()) {
				this.gameController.score.decreaseLife();

				if (this.gameController.over) {
					this.stepBack(_body, lastPiece);

					if (this.doubleTile()) {
						// morreu enquanto comia uma fruta
						return this.body.pop();
					}

					return;
				}

				this.restart();
			}
		}

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
				}
			}
		}

		move (newPiece) {
			var _body = this.body;

			_body.unshift(newPiece);

			return _body.splice(_body.length - 1, 1)[0];
		}

		ateFood () {
			var tail = this.body[this.body.length - 1];

			this.body.push({x: tail.x, y: tail.y});
		}

		doubleTile () {
			let tile       = this.body[this.body.length - 1],
				beforeTile = this.body[this.body.length - 2];

			return (tile.x == beforeTile.x && tile.y == beforeTile.y);
		}

		hasCollided () {
			var head = this.body[0], currentMaze = this.gameController.maze, _self = this;

			return [_self, currentMaze].some(itens => itens.collide(head));
		}

		collide (head) {
			return this.body.some((_body, index) => index && (head.x == _body.x && head.y == _body.y));
		}

		stepBack (_body, lastPiece) {
			_body.push(lastPiece);
			_body.splice(0, 1);
		}

		restart () {
			this.body = [
				{ x: 30, y: 280 },
				{ x: 30, y: 290 },
				{ x: 30, y: 300 }
			];

			this.direction = 'up';
		}
	}

