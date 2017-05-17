import parseMjml from './parser'
import fs from 'fs'

const input = process.argv[2]
const output = process.argv[3]
const stringifyOption = process.argv[4]

console.log(process.argv)

// Read MJML from input
async function readMjml(mjmlJson) {
  return new Promise(resolve => {
    fs.readFile(mjmlJson, 'utf8', (err, mjmlContent) => {
      resolve(mjmlContent)
    })
  })
}

// Write the output in a (specified) file
const outputJSON = (mjml, stringifyOption) => {
  if (stringifyOption) {
    writeMjml(JSON.stringify({
      "mjml": JSON.stringify(parseMjml(mjml))
    }), output)
  }
  else {
    writeMjml(JSON.stringify(parseMjml(mjml)), output)
  }
}

const writeMjml = (outputMjml, outputLocation) => {
  fs.writeFile(outputLocation, outputMjml, err => {
    if (err) { console.log(err) }
  })
}

async function outputAll(input, output, stringifyOption) {
  const inputMjml = await readMjml(input)
  
  if (input && output) {
    outputJSON(inputMjml, stringifyOption)
    console.log(`Wrote ${output}`)
  }
  else {
    console.log('usage: babel-node mjml2json.js input output [-s]')
    return false
  }
}

outputAll(input, output, stringifyOption)
