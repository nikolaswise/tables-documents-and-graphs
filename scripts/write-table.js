const fs = require('fs');
const generate = require('./generate-table.js')

let start = Date.now()
generate({
  rows: 1666000
})
  .then(r => {
    fs.writeFile('./data/table.json', `${JSON.stringify(r)}`, () => {})
    let duration = Date.now() - start
    const nf = new Intl.NumberFormat("en-US", {
      roundingIncrement: 5,
    });
    console.log(`${nf.format(r.length)} rows generated in`)
    console.log(duration, 'ms')
    console.log(nf.format(r.length * 6), "triples ish")
  })


