import cachedResults, { CacheResults } from '../cacheResults/cacheResults'

interface TypeAhead<T> extends CacheResults<T> {
  setMinQueryChars: (chars: number) => void;
  getMinQueryChars: () => number;
}

export const isPositiveInteger = (number: number) => Number.isInteger(number) && number > 0

const typeAhead = <T>(fetcher: (query: string) => Promise<T>): TypeAhead<T> => {
  const _cachedResults = cachedResults(fetcher) 
  let minsChar = 3;

  const setMinQueryChars = (chars: number) => {
    if (isPositiveInteger(chars)) {
      minsChar = chars;
    }
  };

  const getMinQueryChars = () => minsChar

  const fetchResults = (query: string): Promise<T> => {
    if (query.length < minsChar) {
      return new Promise((resolve) => resolve(undefined));
    }

    return _cachedResults.fetchResults(query)
  };

  return {
    setMinQueryChars,
    fetchResults,
    getMinQueryChars,
  };
};

export default typeAhead;
