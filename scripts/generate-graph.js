const { v4 } = require('uuid');
const { uniqueNamesGenerator, names, adjectives, colors, animals, countries } = require('unique-names-generator')

let uuid = v4

let Persons = []
let Organizations = []
let Projects = []
let Groups = []

const randomCompanyName = () => uniqueNamesGenerator({
  dictionaries:  [adjectives, countries],
  separator: ' '
})

const randomProjectName = () => uniqueNamesGenerator({
  dictionaries:  [adjectives, colors, animals],
  separator: ' '
})

const randomName = () => uniqueNamesGenerator({
  dictionaries:  [names]
})

const repeat = (fn, n) => {
  let arr = [...new Array(n)]
  let result = arr.map(() => fn())
  return result
}

const getRandomInt = max => Math.floor(Math.random() * max);
const generateID = () => `uuid:${uuid()}`

const getRando = (arr) => {
 return arr[getRandomInt(arr.length - 1)]
}

const getDate = () => {
  let years = [2022, 2021, 2020, 2019, 2018, 2017, 2016]
  let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
  return `${getRando(years)}.${getRando(months)}.${getRando(days)}`
}

const generateOrganization = () => {
  const id = generateID()
  Organizations.push(id)

  return {
    id: id,
    type: "foaf:Organization",
    name: randomCompanyName(),
    associated: [... new Array(getRandomInt(4))].map(() => getRando(Organizations))
  }
}

const generateGroup = () => {
  const id = generateID()
  Groups.push(id)

  return {
    id: id,
    type: "foaf:Group",
    name: randomProjectName(),
    memberOf: [... new Array(getRandomInt(4))].map(() => getRando(Organizations)),
    related: [... new Array(getRandomInt(4))].map(() => getRando(Groups))
  }
}

const generateProject = () => {
  const id = generateID()
  Projects.push(id)
  return {
    id: id,
    type: "foaf:Project",
    name: randomProjectName(),
    start: getDate()
  }
}

const generatePerson = () => {
  // generate id
  const id = generateID()
  // push id to Persons array
  Persons.push(id)
  return {
    id: id,
    type: "foaf:Person",
    name: `${randomName()} ${randomName()}`,
    knows: [... new Array(getRandomInt(12))].map(() => getRando(Persons))  ,
    currentProject: [... new Array(getRandomInt(3))].map(() => getRando(Projects)),
    pastProject: [... new Array(getRandomInt(10))].map(() => getRando(Projects)),
    memberOf: [... new Array(getRandomInt(3))].map(() => getRando([...Organizations, ...Groups]))
  }
}

const generate = async ({orgs, groups, projects, people}) => {
  return [
    ...repeat(generateOrganization, orgs),
    ...repeat(generateGroup, groups),
    ...repeat(generateProject, projects),
    ...repeat(generatePerson, people)
  ]
}

module.exports = generate