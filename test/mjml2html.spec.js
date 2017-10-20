import mjml2json from '../src/mjml2json'

const MJML_BASIC = `
  <mjml>
    <mj-body>
      <mj-container>
        <mj-section>
          <mj-column>
            <mj-text>Hello world</mj-text>
          </mj-column>
        </mj-section>
      </mj-container>
    </mj-body>
  </mjml>
`

test('converts mjml input to JSON', () => {
  const input = MJML_BASIC
  const result = mjml2json(input)
  expect(typeof result).toBe('object')
  expect(result.tagName).toBe('mjml')
  expect(Object.prototype.toString.call(result.children)).toBe('[object Array]')
  expect(Object.prototype.toString.call(result.attributes)).toBe('[object Object]')
  const mjText = result.children[0].children[0].children[0].children[0].children[0]
  expect(mjText.content).toBe('Hello world')
})

test('should stringify output', () => {
  const input = MJML_BASIC
  const result = mjml2json(input, { stringify: true })
  expect(typeof result).toBe('string')
  expect(result[0]).toBe('{')
})
