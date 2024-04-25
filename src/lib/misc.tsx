export function createQueryString({
  searchParams = '',
  queryObject,
}: {
  searchParams?: string | string[][] | Record<string, string> | URLSearchParams;
  queryObject: { [key: string]: string | string[] };
}): string {
  const params = new URLSearchParams(searchParams);
  Object.keys(queryObject).forEach((key) => {
    if (queryObject[key] === '') {
      params.delete(key);
    } else {
      const value = queryObject[key];
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    }
  });

  return params.toString();
}
