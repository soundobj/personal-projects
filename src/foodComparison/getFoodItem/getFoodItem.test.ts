import getFoodItem, { getFilePath } from './getFoodItem'

describe('getFoodItem', () => {
  //@ts-ignore
  getFilePath = jest.fn((item: string) => {
    return(`./${item}.json`);
  })
  it('dynamically imports food item json', () => {
    return getFoodItem(" food item ").then((res) => {
      expect(res.default).toMatchObject({foo: 'bar'})
    })
  })
})