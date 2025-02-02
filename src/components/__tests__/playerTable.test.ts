import { describe, it, expect } from '@jest/globals'
import { filterData, sortDataValues } from '../../utils/playerTable'

const mockData = [
  {
    id: 1,
    first_name: 'Alex',
    last_name: 'Abrines',
    position: 'G',
    height: '6-6',
    weight: '190',
    jersey_number: '8',
    college: 'FC Barcelona',
    country: 'Spain',
    draft_year: 2013,
    draft_round: 2,
    draft_number: 32,
    team: {
      id: 21,
      conference: 'West',
      division: 'Northwest',
      city: 'Oklahoma City',
      name: 'Thunder',
      full_name: 'Oklahoma City Thunder',
      abbreviation: 'OKC',
    },
  },
  {
    id: 2,
    first_name: 'Jaylen',
    last_name: 'Adams',
    position: 'G',
    height: '6-0',
    weight: '225',
    jersey_number: '10',
    college: 'St. Bonaventure',
    country: 'USA',
    draft_year: null,
    draft_round: null,
    draft_number: null,
    team: {
      id: 1,
      conference: 'East',
      division: 'Southeast',
      city: 'Atlanta',
      name: 'Hawks',
      full_name: 'Atlanta Hawks',
      abbreviation: 'ATL',
    },
  },
]

describe('playerTable.ts', () => {
  describe('filterData', () => {
    it('should filter players by first name search term', () => {
      const filteredData = filterData(mockData, 'Alex')
      expect(filteredData).toHaveLength(1)
      expect(filteredData[0].first_name).toBe('Alex')
    })

    it('should return empty array when no players match search term', () => {
      const filteredData = filterData(mockData, 'Durant')
      expect(filteredData).toHaveLength(0)
    })

    it('should return all players if search term is empty', () => {
      const filteredData = filterData(mockData, '')
      expect(filteredData).toHaveLength(mockData.length)
    })
  })

  describe('sortDataValues', () => {
    it('should sort data by first name in ascending order', () => {
      const sortedData = sortDataValues('first_name', mockData, true)
      expect(sortedData[0].first_name).toBe('Alex')
      expect(sortedData[1].first_name).toBe('Jaylen')
    })

    it('should sort data by first name in descending order', () => {
      const sortedData = sortDataValues('first_name', mockData, false)
      expect(sortedData[0].first_name).toBe('Jaylen')
      expect(sortedData[1].first_name).toBe('Alex')
    })

    it('should sort data by team city in ascending order', () => {
      const sortedData = sortDataValues('country', mockData, true)
      expect(sortedData[0].country).toBe('Spain')
      expect(sortedData[1].country).toBe('USA')
    })

    it('should sort data by team city in descending order', () => {
      const sortedData = sortDataValues('country', mockData, false)
      expect(sortedData[0].country).toBe('USA')
      expect(sortedData[1].country).toBe('Spain')
    })
  })
})
