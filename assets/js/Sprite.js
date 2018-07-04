

	class Sprite {
		constructor (image, xImage, yImage, wImage, hImage) {
			this.image         = image;
			this.xImage        = xImage;
			this.yImage        = yImage;
			this.wImage        = wImage;
			this.hImage        = hImage;
		}

		draw (xCanvas, yCanvas, wCanvas, hCanvas) {
			this.canvasContext.drawImage(
				this.image, this.xImage, this.yImage, this.wImage, this.hImage, xCanvas, yCanvas, wCanvas, hCanvas
			);
		}

		get width () {
			return this.image.width;
		}

		get height () {
			return this.image.height;
		}
	}

