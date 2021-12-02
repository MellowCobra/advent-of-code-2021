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
        return {
          ...pos, 
          horizontal: pos.horizontal + distance, 
          depth: pos.depth + (pos.aim * distance)
        }
      case "up":
        return { ...pos, aim: pos.aim - distance }
      case "down":
        return { ...pos, aim: pos.aim + distance }
      default: 
        return pos
    }
  }, { horizontal: 0, depth: 0, aim: 0 }),
  ({ horizontal, depth }) => horizontal * depth
)(data)

console.log(answer)
