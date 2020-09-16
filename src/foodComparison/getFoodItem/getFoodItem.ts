export const spacesToHyphen = (text: string) => text.trim().replace(/ /g, '-')

export const getFilePath = (item: string) => `../foods/${item}.json`

// @TODO add type for the promise
const getFoodItem = (item: string): Promise<any> => import(getFilePath(spacesToHyphen(item)))

export default getFoodItem;
