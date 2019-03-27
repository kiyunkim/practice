// multiple parameters (with one expression)

// es5:
function multiply(x,y) {
  return x * y;
}

// es6:
const multiply = (x,y) => x * y;
// or
const multiple = (x,y) => { return x * y };


// one parameter ---

// es5:
function splitPhrase(phrase) {
  return phrase.split(' ');
}

// es6:
const splitPhrase = phrase => phrase.split(' ');



// no parameters ---
const logNothing = () => console.log('');



/* -------------------------------------- */
/* more examples..
/* -------------------------------------- */

// es5:
function makeFriend(name, age) {
  return {
    name: name,
    age: age
  }
}

// es6:
const makeFriend = (name, age) => (
  {
    name: name,
    age: age
  }
)