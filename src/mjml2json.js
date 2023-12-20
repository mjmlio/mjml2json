import _ from 'lodash'
import * as htmlparser from 'htmlparser2'
import { globalComponents } from 'mjml-core'

/*import './register-mjml'*/

const CDATASections = []
const MJElements = []

_.forEach(
  {
    ...globalComponents,
  },
  (element, name) => {
    const tagName = element.tagName || name

    if (element.endingTag) {
      CDATASections.push(tagName)
    }

    MJElements.push(tagName)
  },
)

function cleanNode(node) {
  delete node.parent

  // delete children if needed
  if (node.children.length) {
    node.children.forEach(cleanNode)
  } else {
    delete node.children
  }

  // delete attributes if needed
  if (Object.keys(node.attributes).length === 0) {
    delete node.attributes
  }
}

/**
 * Avoid htmlparser to parse ending tags
 */
function addCDATASection(content) {
  const regexTag = tag => new RegExp(`<${tag}([^>/]*)>([^]*?)</${tag}>`, 'gmi')
  const replaceTag = tag => `<${tag}$1><![CDATA[$2]]></${tag}>`

  _.forEach(CDATASections, tag => {
    content = content.replace(regexTag(tag), replaceTag(tag))
  })

  return content
}

function parseAttributes(content) {
  const regexTag = tag => new RegExp(`<${tag}(\\s("[^"]*"|'[^']*'|[^'">])*)?>`, 'gmi')
  const regexAttributes = /(\S+)\s*?=\s*(['"])(.*?|)\2/gim

  _.forEach(MJElements, tag => {
    content = content.replace(regexTag(tag), contentTag =>
      contentTag.replace(
        regexAttributes,
        (match, attr, around, value) => `${attr}=${around}${encodeURIComponent(value)}${around}`,
      ),
    )
  })

  return content
}

/**
 * Convert "true" and "false" string attributes values
 * to corresponding Booleans
 */
function convertBooleansOnAttrs(attrs) {
  return _.mapValues(attrs, val => {
    if (val === 'true') {
      return true
    }
    if (val === 'false') {
      return false
    }
    return val
  })
}

function setEmptyAttributes(node) {
  if (!node.attributes) {
    node.attributes = {}
  }
  if (node.children) {
    node.children.forEach(setEmptyAttributes)
  }
}

function parseMjml(xml, { addEmptyAttributes = true, convertBooleans = true } = {}) {
  if (!xml) {
    return null
  }

  let safeXml = xml

  safeXml = parseAttributes(safeXml)
  safeXml = addCDATASection(safeXml)

  let mjml = null
  let cur = null

  const parser = new htmlparser.Parser(
    {
      onopentag: (name, attrs) => {
        attrs = _.mapValues(attrs, val => decodeURIComponent(val))

        if (convertBooleans) {
          // "true" and "false" will be converted to bools
          attrs = convertBooleansOnAttrs(attrs)
        }

        const newNode = {
          parent: cur,
          tagName: name,
          attributes: attrs,
          children: [],
        }

        if (cur) {
          cur.children.push(newNode)
        } else {
          mjml = newNode
        }

        cur = newNode
      },
      onclosetag: () => {
        cur = (cur && cur.parent) || null
      },
      ontext: text => {
        if (!text) {
          return
        }

        const val = `${(cur && cur.content) || ''}${text}`.trim()

        if (val) {
          cur.content = val.replace('$', '&#36;') // prevent issue with $ sign in MJML
        }
      },
    },
    {
      xmlMode: true,
    },
  )

  parser.write(safeXml)
  parser.end()

  if (!_.isObject(mjml)) {
    throw new Error('Parsing failed. Check your mjml.')
  }

  cleanNode(mjml)

  // assign "attributes" property if not set
  if (addEmptyAttributes) {
    setEmptyAttributes(mjml)
  }

  return mjml
}

export default function mjml2json(input, opts = {}) {
  let json = parseMjml(input, opts)
  if (opts.stringify) {
    json = JSON.stringify(json)
  }
  return json
}
