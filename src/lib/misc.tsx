export function createQueryString({
  searchParams,
  queryObject,
}: {
  searchParams?: string | string[][] | Record<string, string> | URLSearchParams;
  queryObject: { [key: string]: string };
}): string {
  const params = new URLSearchParams(searchParams);
  Object.keys(queryObject).forEach((key) => {
    if (queryObject[key] === '') {
      params.delete(key);
    } else {
      params.set(key, queryObject[key]);
    }
  });

  return params.toString();
}
