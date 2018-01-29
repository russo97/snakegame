


	class Score {
		constructor (sprites, score = 0, increase = 5) {
			this.lifes      = 3;
			this.maxLifes   = 3;
			this.score      = score;
			this.sprites    = sprites;
			this.increase   = increase;
		};

		increaseScore () {
			this.score += this.increase;
		};

		decreaseScore () {
			this.score -= this.increase;
		};

		increaseLife () {
			this.lifes += 1;

			if (this.lifes > this.maxLifes) {
				this.decreaseLife();
			};
		};

		decreaseLife () {
			this.lifes--;

			if (this.lifes < 1) {
				this.changeStatus();
			};
		};

		changeStatus () {};

		weLose () {
			return !this.lifes;
		};

		reset () {
			this.score = 0;
		};

		draw (font) {
			var { full:full, empty:empty } = this.sprites, { canvasContext:ctx, tileSize:tileSize } = full;

			for (var i = 1, len = this.maxLifes; i <= len; i++) {
				var heart = this.lifes >= i ? full : empty;

				heart.draw(405 + (16 * i), 15, tileSize + 4, tileSize + 4);
			};

			ctx.fillStyle = 'gray';
			ctx.font = '14pt Contrail One';
			ctx.fillText('$ ' + this.score, 15, 30);
		};
	};

