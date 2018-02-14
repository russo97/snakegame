



	class Controller {
		constructor (score, screens, maze) {
			this.maze    = maze;
			this.pause   = false;
			this.score   = score;
			this.screens = screens;
			this.current = 'splash';
			this.record  = new Record();
		};

		draw () {
			var currentState = this.over ? 'over' : this.paused ? 'pause' : false;

			if (currentState) {
				try {
					this.screens[currentState]();

					this.over && this.record.draw(this.maze.Sprites.white.canvasContext);
				} catch (e) {};
			};
		};

		setGameState () {
			switch (this.current) {
				case 'splash':
					this.current = 'running';
			};
		};

		get running () {
			return this.current === 'running';
		};

		get paused () {
			return this.pause;
		};

		togglePause () {
			this.pause = !this.pause && !this.over && this.running;
		};

		get over () {
			return this.score.weLose;
		};

		restart () {
			this.score.reset();
			this.current = 'splash';
		};
	};



