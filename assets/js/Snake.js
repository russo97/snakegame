

	class Snake {
		constructor (canvas, canvasContext, tileSize, Segment, gameController) {
			this.body           = [];
			this.canvas         = canvas;
			this.Segment        = Segment;
			this.tileSize       = tileSize;
			this.direction      = undefined;
			this.gameController = gameController;
			this.canvasContext  = canvasContext || this.canvas.getContext('2d');

			this.restart();
		};

		changeDirection (keyCode) {
			var { body:_body } = this, head = _body[0], neck = _body[1];

			switch (keyCode) {
				case 37:
					if (head.y !== neck.y && this.direction != 'left') {
						this.direction = 'left';
					};
					break;
				case 38:
					if (head.x !== neck.x && this.direction != 'up') {
						this.direction = 'up';
					};
					break;
				case 39:
					if (head.y !== neck.y && this.direction != 'right') {
						this.direction = 'right';
					};
					break;
				case 40:
					if (head.x !== neck.x && this.direction != 'down') {
						this.direction = 'down';
					};
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

			_body.splice(_body.length - 1, 1);
			_body.unshift(newPiece);

			if (this.itCollide()) {
				this.restart();

				this.gameController.score.decreaseLife();
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

		ateFood () {
			var tail = this.body[this.body.length - 1];

			this.body.push({x: tail.x, y: tail.y});
		};

		itCollide (item) {
			var head = this.body[0], currentMaze = this.gameController.maze;

			return (
				this.selfCollide(head) || currentMaze.collide(head)
			);
		};

		selfCollide (head) {
			return this.body.some((_body, index) => index && head.x == _body.x && head.y == _body.y);
		};

		mazeCollide (maze) {};

		restart () {
			this.body = [
				{x: 30, y: 280},
				{x: 30, y: 290},
				{x: 30, y: 300}
			];

			this.direction = 'up';
		};
	};

