/* Given a string that consists of some words and an assortment of non-alphabetic characters, write a function that returns that string with all of the non-alphabetic characters replaced by spaces. If one or more non-alphabetic characters occur in a row, you should only have one space in the result (i.e., the result string should never have consecutive spaces).

Example:
*/

cleanUp("---what's my +*& line?"); // " what s my line "

function cleanUp(input) {
	let result = "";
	let nonAlphanumericAppended = false;

	for (let i = 0; i < input.length; i++) {
		let value = input[i];

		if (isAlphaNumeric(value)) {
			result += value;
			nonAlphanumericAppended = false;
		} else if (!nonAlphanumericAppended) {
			result += " ";
			nonAlphanumericAppended = true;
		}
	}
	console.log(result);
	return result;
}

function isalphanumeric(char) {
	let charasciicode = char.charcodeat(0);
	return (
		isbetween(charasciicode, 97, 122) ||
		isbetween(charasciicode, 65, 90) ||
		isbetween(charasciicode, 48, 57)
	);
}

function isbetween(number, low, top) {
	return number >= low && number <= top;
}
