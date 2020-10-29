import typeAheadSuggestions from './typeAheadsuggestions'

describe('foodComparison/typeAheadSuggestions', () => {
  const dictionary = ['apple', 'amoreto', 'amante', 'apostol']
  const tas = typeAheadSuggestions(dictionary);
  it('provides suggestions based on character sequences', () => {
    return tas.getSuggestions('ap').then((data: any) => {
      expect(data).toMatchObject(['apple', 'apostol'])
    })
  })
})