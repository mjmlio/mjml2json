import parseMjml from './parser'
import fs from 'fs'

const output = process.argv[3] ? process.argv[3] : 
  process.argv[2] ? process.argv[2].replace('.mjml', '.json') : ''

// Read MJML from input
const inputMJML = 
new Promise((fullfill, reject) => {
  if (process.argv.length > 2) {
    fs.readFile(process.argv[2], 'utf8', (err, mjmlContent) => {
      if (err) {
        reject(err)
      }
      else {
        fullfill(mjmlContent)
      }
    })
  }
  else {
    reject('usage: babel-node mjml2json.js input [output]')
  }
})

// Write the output in a (specified) file
const outputJSON = (mjml) => {
    fs.writeFile(output, JSON.stringify(parseMjml(mjml)), err => {
      if (err) {
        console.log(err)
      }
    })
}

inputMJML.then(outputJSON, console.log)