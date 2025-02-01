export const resolveNestedValue = (obj: any, path: string): any => {
  if (path === 'full_name') {
    return `${obj.first_name ?? ''} ${obj.last_name ?? ''}`.trim() || '-'
  }
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) ?? '-'
}
