function makeObjectDeepCopy(obj){
	let newObj = {};
	for (let key in obj){				
		
		if (Array.isArray(obj[key])){
			newObj[key] = obj[key].map(item => {
				if ( (typeof item === "object") && (item !== null) ){
					return makeObjectDeepCopy(item)
				}
				return item 
			});
		}
		
		else if (obj[key] instanceof Date){
			newObj[key] = new Date(obj[key]);
		}
		
		else if (typeof obj[key] === 'object' && obj[key] !== null){
			newObj[key] = makeObjectDeepCopy(obj[key]);
		}			
		else{
			newObj[key] = obj[key];	
		}
	}
	return newObj;
}


function selectFromInterval(arr, start, finish){
	let newArr = [];

	if (!Array.isArray(arr)){
		throw new Error('Переданный аргемент не является массивом');	
	}

	if (arr.length === 0){
		throw new Error('Массив пустой');	
	}

	if ( testNumber(start) || testNumber(finish)){
		throw new Error('Одно из значений не действительно');	
	}

	if (start > finish) {
		arr.forEach(elem => {
			if (testNumber(elem)) {
				throw new Error('Одно из значений массива не действительно');	
			}
			if (elem >= finish && elem <= start){
				newArr.push(elem);
			}
		})
	}

	else {
		arr.forEach(elem => {
			if (elem >= start && elem <= finish){
				newArr.push(elem);
			}
		})
	}

	
	return newArr
}

function testNumber(num){
	if (num === null || num === undefined || typeof(num) !== 'number' || num === -Infinity || num === Infinity || isNaN(num) ){
		return true
	}
}


let myIterable = {
	from: 2,
	to: 4,
}

myIterable[Symbol.iterator] = function() {
	if (testNumber(this.from || testNumber(this.to)) || !(this.from <= this.to)) {
		throw new Error('Начальное значение больше конечного');	
	}
	return {
		current: this.from,
		last: this.to,
		next() {
			if(this.current <= this.last) {
				return { done: false, value: this.current++ };
			} else {
				return { done: true };
			}
		},
	};
};


for (let item of myIterable) {
	console.log(item);
}



