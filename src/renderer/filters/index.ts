
export const filename = (val: string): string => {
  if (!val) return

  if (val.substr(0, 1) === '_') {
    return val.substr(1)
  }

  return val.substring(0, val.lastIndexOf('.md'))
}
