export interface Dictionary<T> {
  [key: string]: T
}

interface TypeAhead<T> {
  setMinQueryChars: (chars: number) => void;
  getMinQueryChars: () => number;
  fetchResults: (query: string) => Promise<T[]>;
}

export const isPositiveInteger = (number: number) => Number.isInteger(number) && number > 0

const typeAhead = <T>(fetcher: (query: string) => Promise<T[]>): TypeAhead<T> => {
  const cachedResults: Dictionary<T[]> = {};
  let minsChar = 3;

  const setMinQueryChars = (chars: number) => {
    if (isPositiveInteger(chars)) {
      minsChar = chars;
    }
  };

  const getMinQueryChars = () => minsChar

  const fetchResults = (query: string): Promise<T[]> => {
    if (query.length < minsChar) {
      return new Promise((resolve) => resolve(undefined));
    }

    if (cachedResults[query]) {
      return new Promise((resolve) => {  
        resolve(cachedResults[query]);
      });
    }

    return new Promise((resolve) => {
      fetcher(query).then((res) => {
        cachedResults[query] = res
        resolve(res);
      });
    });
  };

  return {
    setMinQueryChars,
    fetchResults,
    getMinQueryChars,
  };
};

export default typeAhead;
