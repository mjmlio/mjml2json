import parseMjml from './parser'

export default function mjml2json(input, opts) {
  let json = parseMjml(input)
  if (opts.stringify) {
    json = { mjml: JSON.stringify(json) }
  }
  return JSON.stringify(json)
}
