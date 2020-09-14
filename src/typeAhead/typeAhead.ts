export type TypeAheadResults = Record<string, any>;
export type ResultsFetcherResponse = Promise<TypeAheadResults>;
export type ResultsFetcher = (query: string) => ResultsFetcherResponse;

interface TypeAhead {
  setMinQueryChars: (chars: number) => void;
  getMinQueryChars: () => number;
  fetchResults: any;
}

const typeAhead = (fetcher: ResultsFetcher): TypeAhead => {
  const cachedResults: Record<string, any> = {};
  let minsChar = 3;

  const setMinQueryChars = (chars: number) => {
    if (Number.isInteger(chars) && chars > 0) {
      minsChar = chars;
    }
  };

  const getMinQueryChars = () => minsChar

  const fetchResults = (query: string) => {
    if (query.length < minsChar) {
      return new Promise((resolve: any) => resolve(undefined));
    }

    if (cachedResults[query]) {
      return new Promise((resolve: any) => {  
        resolve(cachedResults[query]);
      });
    }

    return new Promise((resolve: any) => {
      fetcher(query).then((res: any) => {
        cachedResults[query] = res;
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
