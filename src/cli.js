#!/bin/env node

import fs from 'fs'
import program from 'commander'
import mjml2json from './mjml2json'
import { version } from '../package.json'

program
  .version(version)
  .usage('[options] <input-file> <output-file>')
  .option('-s, --stringify', 'Stringify output')
  .parse(process.argv)

if (program.args.length !== 2) {
  program.outputHelp()
  process.exit(1)
}

const [inputFilename, outputFilename] = program.args

const input = fs.readFileSync(inputFilename, 'utf8')
const opts = {
  stringify: !!program.stringify,
}
const output = mjml2json(input, opts)

fs.writeFileSync(outputFilename, output)

const stringified = opts.stringify ? ' (stringified)' : ''
console.log(`${inputFilename} was converted to JSON format in ${outputFilename}${stringified}`)
