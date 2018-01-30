



	class Controller {
		constructor (score, screens, maze) {
			this.maze    = maze;
			this.pause   = false;
			this.score   = score;
			this.screens = screens;
			this.current = 'running';
			this.states  = [
				'running',
				'splash',
				'record',
				'over'
			];
		};

		draw () {};

		setGameState () {
			switch (this.current) {
				case 'splash':
					this.current = 'running';
					break;
				case 'record':
					this.current = 'over';
					break;
				case 'over':
					this.current = 'splash';
			};
		};

		get paused () {
			return this.pause;
		};

		togglePause () {
			this.pause = !this.pause && !this.over;
		};

		get over () {
			return this.score.weLose();
		};
	};

















