export interface Dictionary<T> {
  [key: string]: T
}

export interface CacheResults<T> {
  fetchResults: (query: string) => Promise<T>;
}

const cacheResults = <T>(fetcher: (query: string) => Promise<T>): CacheResults<T> => {
  const cachedResults: Dictionary<T> = {};

  const fetchResults = (query: string): Promise<T> => {

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
    fetchResults,
  };
};

export default cacheResults;
