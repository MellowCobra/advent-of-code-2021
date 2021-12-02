const fs = require('fs')

module.exports = (filename) => fs.readFileSync(`../datasets/${filename}`, { encoding: "utf-8" }).split("\n")
