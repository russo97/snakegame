


	class mazeManager {
		constructor (mazes, Sprites, stage) {
			this.mazes     = mazes;
			this.stage     = stage;
			this.Sprites   = Sprites;
			this.wallExist = (row) => /[123]/g.test(row.join('')); // row should be an array
		};

		draw () {
			var Sprites     = this.Sprites,
				tileSize    = Sprites.white.tileSize,
				currentMaze = this.mazes[this.stage],
				mazeRunning = mazeManager.getInnerRow.call(this, currentMaze);

			for (var i = mazeRunning.begin, len1 = mazeRunning.end; i < len1; i++) {
				var row = currentMaze[i];

				if (!this.wallExist(row)) continue;

				var lineRunning = mazeManager.getInnerLine.call(this, row);

				for (var j = lineRunning.begin, len2 = lineRunning.end; j < len2; j++) {
					switch (row[j]) {
						case 1:
						case 2:
						case 3:
							Sprites.white.draw(j * tileSize, i * tileSize, tileSize, tileSize);
							break;
					};
				};
			};
		};

		collide (item) {
			var currentMaze = this.mazes[this.stage], Sprites = this.Sprites, tileSize = Sprites.white.tileSize;

			return (
				currentMaze.some((row, y) =>
					row.some((value, x) => 
						value && item.x === (x * tileSize) && item.y === (y * tileSize)
					)
				)
			);
		};

		static getInnerRow (currentMaze) {
			var str_maze = currentMaze.join('|').split('|'), first, last;

			for (var i = 0, len = str_maze.length; i < len; i++) {
				var row = str_maze[i];

				if (/[123]/g.test(row)) {

					if (isNaN(first)) {
						first = i;
					};

					last = i;
				};
			};

			return { begin: first, end: ++last };
		};

		static getInnerLine (row) {
			var first, last;

			for (var i = 0, len = row.length; i < len; i++) {
				var char = row[i];

				if (/[123]/g.test(char)) {

					if (isNaN(first)) {
						first = i;
					};

					last = i;
				};
			};

			return { begin: first, end: ++last };
		};
	};



