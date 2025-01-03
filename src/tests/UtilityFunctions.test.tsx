import { getWindDirection } from "../utilities/utilityFunctions";

describe('test getWindDirection', function() {
  test('wind degrees 100: result should be E', () => {
    const input = 100, expected = 'E';
    expect(getWindDirection(input)).toStrictEqual(expected)
  })
  test('wind degrees 0: result should be N', () => {
    const input = 0, expected = 'N';
    expect(getWindDirection(input)).toStrictEqual(expected)
  })
  test('wind degrees 281.25: result should be WSW', () => {
    const input = 281.25, expected = 'WNW';
    expect(getWindDirection(input)).toStrictEqual(expected)
  })

})

