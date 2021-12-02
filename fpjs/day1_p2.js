const { Arr, Fn } = require("@mellow.cobra/lib")

const readInput = require("./input")

const data = readInput("day1.txt")

function sum([...nums]) {
  return nums.reduce((acc, a) => acc + a, 0)
}

const answer = Fn.pipe(
  Arr.map((a) => parseInt(a)),
  // Sliding window reduce
  Arr.reduce((acc, depth, index, depths) => {
    if (index >= depths.length - 2) return acc

    const window = [ depth, depths[index + 1], depths[index + 2] ]

    acc.push(window)

    return acc
  }, []),
  // Sum each window
  Arr.map(sum),
  // Then continue with the increase/decrease calculations
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
