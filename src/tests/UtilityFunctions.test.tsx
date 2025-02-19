import { useTransformData } from "../hooks/useTransformData";
import { AirportData } from "../types";
import { getWindDirection } from "../utilities/utilityFunctions";
import abqAirportData from "../tests/abq_airport_data.json";

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

describe('test useTransformData', function() {
  test('test ABQ airport API response transform', () => {
    const selectedAirport = "ABQ", fetchType = "AIRPORT_INFO";
    const airportResponse = abqAirportData;
    const expected = {
      "id": "ABQ",
      "name": "KABQ - Albuquerque International Sunport",
      "runways": [
        "08-26",
        "12-30",
        "03-21"
      ],
      "coords": [
        35.03893202803115,
        -106.6082620852866
      ]
    }
    expect(useTransformData(selectedAirport, fetchType, airportResponse) as AirportData).toStrictEqual(expected);
  })
});



