/*Question 1

Write four different ways to remove all of the elements from the following array: */

let numbers = [1, 2, 3, 4];

let len = numbers.length;
for (let i = 0; i < len; i++) {
	numbers.pop();
}
console.log(numbers);

numbers = [1, 2, 3, 4];

for (let i = 0; i < len; i++) {
	numbers.shift();
}
console.log(numbers);

numbers = [1, 2, 3, 4];

numbers = [];
console.log(numbers);

numbers = [1, 2, 3, 4];
while (numbers.length) {
	numbers.pop();
}

numbers = [1, 2, 3, 4];
numbers.length = 0;
console.log(numbers);

numbers = [1, 2, 3, 4];
numbers.splice(0, len);
console.log(numbers);
