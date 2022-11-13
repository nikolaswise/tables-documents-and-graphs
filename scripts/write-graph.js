const fs = require('fs');
const generate = require('./generate-graph.js')

let start = Date.now()
generate({
  orgs: 5000,
  groups: 20000,
  projects: 200000,
  people: 100000
})
  .then(r => {
    fs.writeFile('./data/graph.json', `${JSON.stringify(r)}`, () => {})
    let duration = Date.now() - start
    const nf = new Intl.NumberFormat("en-US", {
      roundingIncrement: 5,
    });
    console.log(`${nf.format(r.length)} nodes generated in`)
    console.log(duration, 'ms')
    console.log(nf.format(r.length * 33), "triples ish")
  })


