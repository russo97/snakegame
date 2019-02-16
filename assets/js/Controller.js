



	class Controller {
		constructor (score, screens, maze) {
			this.maze    = maze;
			this.pause   = false;
			this.score   = score;
			this.screens = screens;
			this.current = 'splash';
			this.record  = new Record();
		}

		draw () {
			var currentState = this.over ? 'over' : this.paused ? 'pause' : false;

			if (currentState) {
				try {
					this.screens[currentState]();
				} catch (e) {}

				if (this.over) {
					if (this.record.hasAnRecord) {
						this.screens.drawRecord(JSON.parse(this.record.record));
					} else {
						this.screens.noRecord();
					}
				}
			}
		}

		setGameState () {
			switch (this.current) {
				case 'splash':
					this.current = 'running';
					break;
			}
		}

		get running () {
			return this.current === 'running';
		}

		get paused () {
			return this.pause;
		}

		togglePause () {
			this.pause = !this.pause && !this.over && this.running;
		}

		get over () {
			if (this.score.weLose) {
				let overcame = this.score.score > 0 && this.record.overcame(this.score.score);

				if (overcame && !this.record.newRecord.added) {
					var user = prompt('Você atingiu um novo recorde, qual o seu nome gafanhoto?', 'Até 9 letras') || 'UNKNOWN';

					this.record.setNewRecord(user.substr(0, 9), this.score.score);

					this.record.newRecord.added = 1;
				}
			}

			return this.score.weLose;
		}

		restart () {
			this.score.reset();
			this.current = 'splash';
			this.record.newRecord.added = 0;
		}
	}



