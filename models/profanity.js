const Filter = require("bad-words") // require
const filter = new Filter() // 

const cleanInput = filter.clean(userInput)

const filterEx = new Filter({ exclude: ['foo', 'bar'] }); // add new words to the bad list

console.log(filter.clean("don't be an asshole"))
