# MJML2JSON

## Purpose

Converts a MJML template from an `XML` syntax to a valid `JSON` syntax.

## Installation

`npm install`

Optional: if you get an error like `command not found: babel-node` when running it, run `npm install babel-cli -g`.

## Usage

Input and output filenames must be set, both with their extensions. Use the `-s` optional argument to stringify the output (and make it compatible with the [MJML API](https://mjml.io/api)).

`babel-node mjml2json.js input output [-s]`
