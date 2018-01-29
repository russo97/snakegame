


class Segment {
	constructor (Sprites, canvas) {
		this.canvas  = canvas;
		this.sprites = Sprites;
	};

	head (head, neck) {
		var Sprites = this.sprites.head, tileSize = Sprites.up.tileSize, last_w = this.canvas.width - tileSize, last_h = this.canvas.height - tileSize;

		if ((head.y == neck.y - tileSize || head.y == last_h && !neck.y) && head.x == neck.x) {
			Sprites.up.draw(head.x, head.y, tileSize, tileSize);
		} else
		if ((head.x == neck.x - tileSize || head.x == last_w && !neck.x) && head.y == neck.y) {
			Sprites.left.draw(head.x, head.y, tileSize, tileSize);
		} else
		if ((head.x == neck.x + tileSize || neck.x == last_w && !head.x) && head.y == neck.y) {
			Sprites.right.draw(head.x, head.y, tileSize, tileSize);
		} else
		if ((head.y == neck.y + tileSize || neck.y == last_h && !head.y) && head.x == neck.x) {
			Sprites.down.draw(head.x, head.y, tileSize, tileSize);
		};
	};

	body (node, beforeNode, afterNode) {
		var Sprites = this.sprites, tileSize = Sprites.body.vertical.tileSize, wCanvas = this.canvas.width, hCanvas = this.canvas.height;

		if (this.horizontal(node, beforeNode, afterNode, tileSize)) {
			Sprites.body.horizontal.draw(node.x, node.y, tileSize, tileSize);
		} else
		if (this.vertical(node, beforeNode, afterNode, tileSize)) {
			Sprites.body.vertical.draw(node.x, node.y, tileSize, tileSize);
		} else {

			var module = this.curve(node, beforeNode, afterNode, tileSize);

			Sprites.curve[module].draw(node.x, node.y, tileSize, tileSize);

		};
	};

	curve (node, beforeNode, afterNode, tileSize) {
		return (
			this.ULCurve(node, beforeNode, afterNode, tileSize) ? 'UL' :
			this.URCurve(node, beforeNode, afterNode, tileSize) ? 'UR' :
			this.DLCurve(node, beforeNode, afterNode, tileSize) ? 'DL' :
			this.DRCurve(node, beforeNode, afterNode, tileSize) ? 'DR' : 'NO_MATCHES'
		);
	};

	ULCurve (node, before, after, tileSize) {
		var last_w = this.canvas.width - tileSize, last_h = this.canvas.height - tileSize;

		return (
			(node.y == after.y && node.x == after.x + tileSize && node.y == before.y + tileSize && node.x == before.x) ||
			(node.x == after.x && node.y == after.y + tileSize && node.x == before.x + tileSize && node.y == before.y) ||
			(!node.x && !after.x && node.y == after.y + tileSize && node.y == before.y && before.x == last_w) ||
			(!node.y && !after.y && node.x == after.x + tileSize && node.x == before.x && before.y == last_h) ||
			(!node.y && !before.y && node.x == before.x + tileSize && node.x == after.x && after.y == last_h) ||
			(!node.x && !before.x && node.y == before.y + tileSize && node.y == after.y && after.x == last_w) ||
			(!node.x && !node.y && !after.y && !before.x && after.x == last_w && before.y == last_h) ||
			(!node.x && !node.y && !after.x && !before.y && after.y == last_h && before.x == last_w)
		);
	};

	URCurve (node, before, after, tileSize) {
		var last_w = this.canvas.width - tileSize, last_h = this.canvas.height - tileSize;

		return (
			(node.x == before.x && node.y == before.y + tileSize && node.x == after.x - tileSize && node.y == after.y) ||
			(node.y == before.y && node.x == before.x - tileSize && node.y == after.y + tileSize && node.x == after.x) ||
			(!after.x && node.x == last_w && node.x == before.x && node.y == after.y && node.y == before.y + tileSize) ||
			(!before.x && node.x == last_w && node.y == before.y && node.x == after.x && node.y == after.y + tileSize) ||
			(!node.y && !after.y && node.x == after.x - tileSize && node.x == before.x && before.y == last_h) ||
			(!node.y && !before.y && node.x == before.x - tileSize && node.x == after.x && after.y == last_h) ||
			(!node.y && !after.x && !after.y && node.x == last_w && node.x == before.x && before.y == last_h) ||
			(!node.y && !before.y && !before.y && node.x == last_w && node.x == after.x && after.y == last_h)
		);
	};

	DLCurve (node, before, after, tileSize) {
		var last_w = this.canvas.width - tileSize, last_h = this.canvas.height - tileSize;

		return (
			(node.x == after.x && node.y == after.y - tileSize && node.x == before.x + tileSize && node.y == before.y) ||
			(node.x == before.x && node.y == before.y - tileSize && node.x == after.x + tileSize && node.y == after.y) ||
			(!before.y && node.x == after.x + tileSize && node.y == last_h && node.y == after.y && node.x == before.x) ||
			(!after.y && node.x == before.x + tileSize && node.y == last_h && node.y == before.y && node.x == after.x) ||
			(!node.x && !after.x && node.y == after.y - tileSize && node.y == before.y && before.x == last_w) ||
			(!node.x && !before.x && node.y == before.y - tileSize && node.y == after.y && after.x == last_w) ||
			(!node.x && !before.x && !before.y && node.y == last_h && node.y == after.y && after.x == last_w) ||
			(!node.x && !after.x && !after.y && node.y == last_h && node.y == before.y && before.x == last_w)
		);
	};

	DRCurve (node, before, after, tileSize) {
		var last_w = this.canvas.width - tileSize, last_h = this.canvas.height - tileSize;

		return (
			(node.x == after.x && node.y == before.y && node.y == after.y - tileSize && node.x == before.x - tileSize) ||
			(node.x == before.x && node.y == after.y && node.y == before.y - tileSize && node.x == after.x - tileSize) ||
			(!before.x && node.x == last_w && node.x == after.x && node.y == before.y && node.y == after.y - tileSize) ||
			(!after.x && node.x == last_w && node.x == before.x && node.y == after.y && node.y == before.y - tileSize) ||
			(!after.y && node.y == last_h && node.y == before.y && node.x == after.x && node.x == before.x - tileSize) ||
			(!before.y && node.y == last_w && node.x == before.x && node.y == after.y && node.x == after.x - tileSize) ||
			(!after.x && !before.y && node.x == last_w && node.y == last_h && node.x == before.x && node.y == after.y) ||
			(!before.x && !after.y && node.x == last_w && node.y == last_h && node.x == after.x && node.y == before.y)
		);
	};

	horizontal (node, before, after, tileSize) {
		var last_w = this.canvas.width - tileSize;

		return (node.y == after.y && node.y == before.y) && (
			(node.x == before.x - tileSize && node.x == after.x + tileSize) ||
			(node.x == before.x + tileSize && node.x == after.x - tileSize) ||
			(node.x == last_w && before.x == node.x - tileSize && !after.x) ||
			(before.x == last_w && after.x == node.x + tileSize && !node.x) ||
			(node.x == last_w && after.x == node.x - tileSize && !before.x) ||
			(after.x == last_w && before.x == node.x + tileSize && !node.x)
		);
	};

	vertical (node, before, after, tileSize) {
		var last_h = this.canvas.height - tileSize;

		return (node.x == after.x && node.x == before.x) && (
			(node.y == before.y - tileSize && node.y == after.y + tileSize) ||
			(node.y == before.y + tileSize && node.y == after.y - tileSize) ||
			(node.y == last_h && before.y == node.y - tileSize && !after.y) ||
			(before.y == last_h && after.y == node.y + tileSize && !node.y) ||
			(node.y == last_h && after.y == node.y - tileSize && !before.y) ||
			(after.y == last_h && before.y == node.y + tileSize && !node.y)
		);
	};

	tail (node, beforeNode) {
		var Sprites = this.sprites.tail, tileSize = Sprites.up.tileSize, last_w = this.canvas.width - tileSize, last_h = this.canvas.height - tileSize;

		if ((beforeNode.x == node.x - tileSize || !node.x && beforeNode.x == last_w) && beforeNode.y == node.y) {
			Sprites.left.draw(node.x, node.y, tileSize, tileSize);
		} else
		if ((beforeNode.y == node.y - tileSize || !node.y && beforeNode.y == last_h) && beforeNode.x == node.x) {
			Sprites.up.draw(node.x, node.y, tileSize, tileSize);
		} else
		if ((beforeNode.x == node.x + tileSize || !beforeNode.x && node.x == last_w) && beforeNode.y == node.y) {
			Sprites.right.draw(node.x, node.y, tileSize, tileSize);
		} else
		if ((beforeNode.y == node.y + tileSize || !beforeNode.y && node.y == last_h) && beforeNode.x == node.x) {
			Sprites.down.draw(node.x, node.y, tileSize, tileSize);
		};
	};
};



