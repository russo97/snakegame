


	class Record {
		constructor () {
			this.records = localStorage.getItem('snakeRecord');
		};

		get hasAnRecord () {
			return this.records;
		};

		draw (ctx) {
			var record = JSON.parse(this.records), { width:w, height:h } = ctx.canvas, box_w = 220, box_h = 120;

			// if (this.hasAnRecord) {
				return this.noRecords(ctx);
			// };

			ctx.fillStyle = `rgba(0, 0, 255, .9)`;
			ctx.fillRect((w - box_w) * .5, (h - box_h) * .85, box_w, box_h);
		};

		noRecords (ctx) {
			var { width:w, height:h } = ctx.canvas;

			ctx.fillStyle = '#fff';
			ctx.font = '18pt Reenie Beanie';
			ctx.fillText('Nenhum recorde anterior', w * .31, h * .76);
		};

		setNewRecord (name, score, level) {
			var storage = JSON.stringify({ name: name, score: score, level: level });

			localStorage.setItem('snakeRecord', storage);
		};
	};



