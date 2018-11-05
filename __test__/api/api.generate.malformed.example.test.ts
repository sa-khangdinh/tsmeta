import { readFileSync as ReadFileSync } from 'fs'
import { TsMeta } from '../../src'
import { GenerateMalformedExample } from '../../src/api/api.generate.malformed.example'

const tsmeta: TsMeta = JSON.parse(ReadFileSync('__mock__/schema/tsmeta.mock.json', { encoding: 'utf8' }))
// tslint:disable-next-line no-any
const expectedExample: any = {
  count: 'text',
  dump: true,
  dumper: true,
  many: true,
  manyOther: true,
  mapped: true,
  mappedOther: true,
  much: true,
  muchOther: true,
  percent: 'text',
  text: true,
  that: true,
  thatOther: true,
  truth: 1,
  whatever: undefined
}

/**
 * generate example test
 */
describe('GenerateExample test', () => {
  test('generateExample', async () => {
    const example: any = GenerateMalformedExample('SomethingMock', tsmeta) // tslint:disable-line no-any

    expect(example.mapped).toEqual(expectedExample.mapped)
  })
})