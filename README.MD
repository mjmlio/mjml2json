# mjml2json

## Purpose

Converts a [MJML](https://github.com/mjmlio/mjml) template from XML to JSON.

## Installation

```bash
yarn add mjml2json

# or

npm i mjml2json
```

## Usage

### CLI

Input and output filenames must be set, both with their extensions. Use the `-s` optional argument to stringify the output (and make it compatible with the [MJML API](https://mjml.io/api)).

```bash
mjml2json input.mjml output.json [-s]
```

The `-s` option will stringify the output.

### Require hook

```js
import mjml2json from 'mjml2json'

// or

const mjml2json = require('mjml2json')
```

## json2mjml

If you need to convert a MJML template from JSON to XML, check [json2mjml](https://github.com/ngarnier/json2mjml).
