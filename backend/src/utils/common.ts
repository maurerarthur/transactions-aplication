export const removeObjectAttributes = (obj: object | any, attributes: string[]): object => {
  const clonedObj: any = { ...obj }

  for(let attribute of attributes) {
    delete clonedObj[attribute]
  }

  return clonedObj
}