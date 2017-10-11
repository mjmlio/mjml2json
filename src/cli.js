#!/bin/env node

import fs from 'fs'
import mjml2json from './mjml2json'

const inputFilename = process.argv[2]
const outputFilename = process.argv[3]
const opt = process.argv[4]

if (!inputFilename || !outputFilename || (opt && opt !== '-s')) {
  console.log('usage: mjml2json input.mjml output.json [-s]')
  process.exit(1)
}

const input = fs.readFileSync(inputFilename, 'utf8')
const opts = { stringify: opt === '-s' }
const output = mjml2json(input, opts)

fs.writeFileSync(outputFilename, output)

const stringified = opts.stringify ? ' (stringified)' : ''
console.log(
  `${inputFilename} was converted to JSON format in ${outputFilename}${stringified}`,
)
