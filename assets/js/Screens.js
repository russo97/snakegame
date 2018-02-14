


	class Screens {
		constructor (Sprites, canvasContext) {
			this.showTime      = 0;
			this.Sprites       = Sprites;
			this.canvasContext = canvasContext;
		};

		splash () {
			var ctx     = this.canvasContext,
				canvas  = ctx.canvas,
				Sprites = this.Sprites,
				wCanvas = canvas.width,
				hCanvas = canvas.height,
				wImage  = Math.floor(Sprites.splash.width * 1),
				hImage  = Math.floor(Sprites.splash.height * 1);

			Sprites.splash.draw((wCanvas - wImage) * .5, (hCanvas - hImage) * .5, wImage, hImage);

			this.showTime++;

			if (this.showTime > 10) {
				return this.showTime = this.showTime > 20 ? 0 : this.showTime++;
			};

			ctx.fillStyle = '#000';
			ctx.font = '20pt Reenie Beanie';
			ctx.fillText('Clique ou pressione ESPACE para iniciar', wCanvas * .13, hCanvas * .78);
		};

		noRecord () {
			var ctx     = this.canvasContext,
				canvas  = ctx.canvas,
				Sprites = this.Sprites,
				wCanvas = canvas.width,
				hCanvas = canvas.height,
				wImage  = Sprites.over.width,
				hImage  = Sprites.over.height;

			ctx.fillStyle = '#fff';
			ctx.font = '20pt Reenie Beanie';
			ctx.fillText('Ainda não existem records', wCanvas * .26, hCanvas * .78);
		};

		pause () {
			var ctx = this.canvasContext, Sprites = this.Sprites, canvas = ctx.canvas;

			Sprites.pause.draw(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = '#fff';
			ctx.font = '10pt Consolas';
			ctx.fillText('Pressione P para continuar', canvas.width * .31, canvas.height * .97);
		};

		over () {
			var ctx     = this.canvasContext,
				canvas  = ctx.canvas,
				Sprites = this.Sprites,
				wCanvas = canvas.width,
				hCanvas = canvas.height,
				wImage  = Sprites.over.width,
				hImage  = Sprites.over.height;

			Sprites.over.draw((wCanvas - wImage) * .5, (hCanvas - hImage) * .5, wImage, hImage);
		};
	};


