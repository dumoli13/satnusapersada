'use server';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export default async function apiFetch<Request, Response>({
  url,
  method = 'GET',
  payload,
  cache,
}: {
  url: string;
  method?: HTTPMethod;
  payload?: Request;
  cache?: RequestCache;
}): Promise<
  | {
      success: true;
      status: 200;
      message: string;
      data: Response;
    }
  | {
      success: false;
      status: number;
      message: string;
    }
> {
  if (!process.env.NEXT_PUBLIC_API_URL)
    return { success: false, status: 400, message: 'API URL is not defined' };

  let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let body: BodyInit | null = null;
  if (payload) {
    if (method === 'GET') {
      const params = new URLSearchParams();
      Object.keys(payload).forEach((key) => {
        const payloadObj = payload as { [k: string]: any };
        if (Array.isArray(payloadObj[key])) {
          payloadObj[key].forEach((item: any) => {
            params.append(`${key}[]`, item);
          });
        } else if (typeof payloadObj[key] !== 'undefined') {
          params.append(key, payloadObj[key]);
        }
      });
      apiUrl = `${apiUrl}?${params}`;
    } else {
      body = JSON.stringify(payload);
    }
  }

  console.log('body', body);

  const response = await fetch(apiUrl, {
    method,
    headers,
    body,
    cache,
  });

  const data = await response.json();
  console.log('data', data);

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: data?.message ?? 'Failed to fetch data',
    };
  }

  return {
    success: true,
    status: 200,
    message: data?.message ?? 'Success',
    data: data ?? null,
  };
}
