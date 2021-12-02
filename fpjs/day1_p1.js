const { Arr, Fn } = require("@mellow.cobra/lib")

const readInput = require("./input")

const data = readInput("day1.txt")

const answer = Fn.pipe(
  Arr.map((a) => parseInt(a)),
  Arr.reduce((acc, depth) => {
    switch(true) {
      case acc.lastDepth == null:
        return { lastDepth: depth, relativeDepths: [ 'N/A' ] }
      case acc.lastDepth < depth:
        return { lastDepth: depth, relativeDepths: [ ...acc.relativeDepths, "increased" ] }
      case acc.lastDepth > depth:
        return { lastDepth: depth, relativeDepths: [ ...acc.relativeDepths, "decreased" ] }
      default:
        return { lastDepth: depth, relativeDepths: [ ...acc.relativeDepths, "equivalent" ] }
    }
  }, { lastDepth: null, relativeDepths: [] }),
  ({ relativeDepths }) => relativeDepths,
  Arr.filter((rd) => rd === "increased"),
  Arr.length
)(data)

console.log(answer)
