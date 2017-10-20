import mjml2json from '../src/mjml2json'

test('converts mjml input to JSON', () => {
  const input = `
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
  const result = mjml2json(input)
  expect(typeof result).toBe('object')
})
