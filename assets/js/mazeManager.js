


	class mazeManager {
		constructor (mazes, Sprites) {
			this.stage           = 0;
			this.mazes           = mazes;
			this.Sprites         = Sprites;
			this.mazesDelimiters = undefined;

			this.setDelimiters();
		}

		wallExist (row) {
			return /^\d/g.test(row.join(''));
		}

		setDelimiters () {
			let delimiters = [];

			for (let i = 0, len = this.mazes.length; i < len; i++) {
				delimiters.push(mazeManager.getInnerRow.call(this, this.mazes[i]));
			}

			this.mazesDelimiters = delimiters;
		}

		get getStage () {
			return this.stage;
		}

		set setStage (value) {
			this.stage = value;
		}

		get currentMaze () {
			return this.mazes[this.getStage];
		}

		draw () {
			var Sprites     = this.Sprites,
				currentMaze = this.currentMaze,
				tileSize    = Sprites.white.tileSize,
				delimiters  = this.mazesDelimiters[this.getStage];

			for (var i = delimiters.begin, len1 = delimiters.end; i < len1; i++) {
				var row = currentMaze[i];

				if (this.wallExist(row)) {
					var lineRunning = mazeManager.getInnerLine.call(this, row);

					for (var j = lineRunning.begin, len2 = lineRunning.end; j < len2; j++) {
						switch (row[j]) {
							case 1:
							case 2:
							case 3:
								Sprites.white.draw(j * tileSize, i * tileSize, tileSize, tileSize);
								break;
						}
					}
				}
			}
		}

		collide (item) {
			var currentMaze = this.mazes[this.stage], tileSize = this.Sprites.white.tileSize;

			return currentMaze.some((row, y) =>
				row.some((value, x) => 
					value && item.x === (x * tileSize) && item.y === (y * tileSize)
				)
			);
		}

		static getInnerRow (currentMaze) {
			var str_maze = currentMaze.join('|').split('|'), first, last;

			for (var i = 0, len = str_maze.length; i < len; i++) {
				var row = str_maze[i];

				if (/^\d/g.test(row)) {

					if (isNaN(first)) {
						first = i;
					}

					last = i;
				}
			}

			return { begin: first, end: ++last };
		}

		static getInnerLine (row) {
			var first, last;

			for (var i = 0, len = row.length; i < len; i++) {
				var char = row[i];

				if (/^[123]/g.test(char)) {

					if (isNaN(first)) {
						first = i;
					}

					last = i;
				}
			}

			return { begin: first, end: ++last };
		}
	}



