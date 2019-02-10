


	class Record {
		constructor () {
			this.record    = undefined;
			this.newRecord = {
				added: 0
			};
		}

		get hasAnRecord () {
			this.record = this.record || localStorage.getItem('snakeRecord');

			return this.record;
		}

		getExistsRecord () {}

		updateRecord (record) {
			this.record = record;

			localStorage.setItem('snakeRecord', record);
		}

		overcame (score) {
			return !this.record || score > JSON.parse(this.record).score;
		}

		setNewRecord (name, score) {
			var storage = { name: name, score: score };

			this.updateRecord(JSON.stringify(storage));

			var url = `http://mineapps.000webhostapp.com/update_data.php?playername=${name}&gamename=Snake Game&playerscore=${score}`;

			var xhr = new XMLHttpRequest();

			xhr.open("GET", url, 1);

			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			xhr.onreadystatechange = function () {
				if (xhr.status !== 200) {
					alert('Não foi possível salvar o record, ele ficará disponível apenas no PC que você usa agora');
				}
			}

			xhr.send();
		}
	}