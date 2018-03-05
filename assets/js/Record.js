


	class Record {
		constructor () {
			this.record    = localStorage.getItem('snakeRecord');
			this.newRecord = {
				added: 0
			};
		};

		get hasAnRecord () {
			return this.record;
		};

		updateRecord (record) {
			this.record = record;

			localStorage.setItem('snakeRecord', record);
		};

		overcame (score) {
			return !this.record || score > JSON.parse(this.record).score;
		};

		setNewRecord (name, score) {
			var storage = { name: name, score: score };

			this.updateRecord(JSON.stringify(storage));
		};
	};



