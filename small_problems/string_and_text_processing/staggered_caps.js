/* Write a function that takes a string as an argument, and returns that string with a staggered capitalization scheme. Every other character, starting from the first, should be capitalized and should be followed by a lowercase or non-alphabetic character. Non-alphabetic characters should not be changed, but should be counted as characters for determining when to switch between upper and lower case.

Examples:
*/

staggeredCase('I Love Launch School!');        // "I LoVe lAuNcH ScHoOl!"
staggeredCase('ALL_CAPS');                     // "AlL_CaPs"
staggeredCase('ignore 77 the 444 numbers');    // "IgNoRe 77 ThE 444 NuMbErS"

function staggeredCase(str) {
  let ret = '';

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (i % 2 === 0) ret += char.toUpperCase();
    else ret += char.toLowerCase();
  }

  console.log(ret);
  return ret;
}
