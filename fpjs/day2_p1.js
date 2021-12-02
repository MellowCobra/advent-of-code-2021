const { Arr, Fn, Str, Obj } = require("@mellow.cobra/lib")

const readInput = require("./input")

const data = readInput("day2.txt")


const answer = Fn.pipe(
  Arr.map(Str.split(" ")),
  Arr.map(([direction, distance]) => ({ direction, distance: parseInt(distance) })),
  Arr.reduce((pos, movement) => {
    const { direction, distance } = movement

    switch(direction) {
      case "forward": 
        return { ...pos, horizontal: pos.horizontal + distance}
      case "up":
        return { ...pos, depth: pos.depth - distance }
      case "down":
        return { ...pos, depth: pos.depth + distance }
      default: 
        return pos
    }
  }, { horizontal: 0, depth: 0 }),
  Obj.values,
  Arr.reduce((product, num) => product * num, 1)
)(data)

console.log(answer)
