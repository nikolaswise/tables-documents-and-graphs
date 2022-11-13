const { v4 } = require('uuid');
const { uniqueNamesGenerator, names, adjectives, colors, animals, countries } = require('unique-names-generator')

let uuid = v4

const randomName = () => uniqueNamesGenerator({
  dictionaries:  [names]
})

const randomBookTitle = () => uniqueNamesGenerator({
  dictionaries:  [adjectives, colors, animals],
  separator: ' '
})

const randomPublisherName = () => uniqueNamesGenerator({
  dictionaries:  [adjectives, animals],
  separator: ' '
})

const getRandomInt = max => Math.floor(Math.random() * max);

const getRando = (arr) => {
 return arr[getRandomInt(arr.length - 1)]
}

const getDate = () => {
  let years = [2022, 2021, 2020, 2019, 2018, 2017, 2016]
  let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
  return `${getRando(years)}.${getRando(months)}.${getRando(days)}`
}

const repeat = (fn, n) => {
  let arr = [...new Array(n)]
  let result = arr.map(() => fn())
  return result
}

const generateBook = ({Authors, Publishers}) => () => {
  return {
    id: `isbn:${uuid()}`,
    title: randomBookTitle(),
    published: getDate(),
    author: getRando(Authors),
    publisher: getRando(Publishers),
    pages: getRandomInt(600) + 20
  }
}

const generate = async ({rows}) => {
  const Authors = [...new Array(Math.round(rows / 3))].map(() => `${randomName()} ${randomName()}`)
  const Publishers = [...new Array(Math.round(rows / 10000))].map(() => `${randomPublisherName()}`)
  return [...repeat(generateBook({Authors, Publishers}), rows)]
}

module.exports = generate