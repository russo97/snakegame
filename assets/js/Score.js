


	class Score {
		constructor (sprites, score = 0, increase = 5) {
			this.lifes      = 3;
			this.maxLifes   = 3;
			this.score      = score;
			this.sprites    = sprites;
			this.increase   = increase;
		}

		increaseScore () {
			this.score += this.increase;
		}

		decreaseScore () {
			this.score -= this.increase;
		}

		increaseLife () {
			this.lifes += 1;

			if (this.lifes > this.maxLifes) {
				this.decreaseLife();
			}
		}

		decreaseLife () {
			this.lifes--;

			if (this.lifes < 1) {
				this.changeStatus();
			}
		}

		changeStatus () {};

		get weLose () {
			return !this.lifes;
		}

		reset () {
			this.score = 0;
			this.lifes = this.maxLifes;
		}

		draw (font) {
			var { full:full, empty:empty } = this.sprites, { canvasContext:ctx, tileSize:tileSize } = full;

			for (var i = 1, len = this.maxLifes; i <= len; i++) {
				var heart = this.lifes >= i ? full : empty;

				heart.draw(405 + (16 * i), 15, tileSize + 4, tileSize + 4);
			}

			let espacamento = this.score > 100 ? 1 : this.score > 995 ? 2 : this.score > 9995 ? 3 : this.score > 99995 ? 4 : 0;

			ctx.fillStyle = 'gray';
			ctx.font = '14pt Contrail One';
			ctx.fillText('$ ' + this.score, 30 + (espacamento * 5), 30);
		}
	}

