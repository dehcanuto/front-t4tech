export const resolveNestedValue = (obj: any, path: string): any => {
  if (path === 'full_name') {
    return `${obj.first_name ?? ''} ${obj.last_name ?? ''}`.trim() || '-'
  }
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) ?? '-'
}

export const getValueNested = (obj: any, path: string) => {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    result = result[key]
    if (result === undefined) {
      return undefined
    }
  }

  return result
}
