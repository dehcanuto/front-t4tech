import { describe, it, expect } from '@jest/globals'
import { resolveNestedValue, getValueNested } from '../../utils/nestedValues'

describe('resolveNestedValue', () => {
  it('should return full name when path is "full_name"', () => {
    const player = {
      first_name: 'Alex',
      last_name: 'Abrines',
    }

    const result = resolveNestedValue(player, 'full_name')
    expect(result).toBe('Alex Abrines')
  })

  it('should return "-" if full name is empty', () => {
    const player = {
      first_name: '',
      last_name: '',
    }

    const result = resolveNestedValue(player, 'full_name')
    expect(result).toBe('-')
  })

  it('should return "-" if the path does not exist', () => {
    const player = {
      first_name: 'Alex',
      last_name: 'Abrines',
    }

    const result = resolveNestedValue(player, 'non_existent')
    expect(result).toBe('-')
  })

  it('should return value for a valid nested path', () => {
    const player = {
      team: {
        city: 'Oklahoma City',
        name: 'Thunder',
      },
    }

    const result = resolveNestedValue(player, 'team.city')
    expect(result).toBe('Oklahoma City')
  })

  it('should return "-" for a path with a non-existent nested property', () => {
    const player = {
      team: {
        city: 'Oklahoma City',
        name: 'Thunder',
      },
    }

    const result = resolveNestedValue(player, 'team.non_existent')
    expect(result).toBe('-')
  })
})

describe('getValueNested', () => {
  it('should return the value for a valid nested path', () => {
    const player = {
      team: {
        city: 'Oklahoma City',
        name: 'Thunder',
      },
    }

    const result = getValueNested(player, 'team.city')
    expect(result).toBe('Oklahoma City')
  })

  it('should return undefined for a non-existent path', () => {
    const player = {
      team: {
        city: 'Oklahoma City',
        name: 'Thunder',
      },
    }

    const result = getValueNested(player, 'team.non_existent')
    expect(result).toBeUndefined()
  })

  it('should return undefined for a non-existent nested property', () => {
    const player = {
      team: {
        city: 'Oklahoma City',
        name: 'Thunder',
      },
    }

    const result = getValueNested(player, 'non_existent.path')
    expect(result).toBeUndefined()
  })

  it('should return undefined for an empty path', () => {
    const player = {
      first_name: 'Alex',
      last_name: 'Abrines',
    }

    const result = getValueNested(player, '')
    expect(result).toBeUndefined()
  })
})
