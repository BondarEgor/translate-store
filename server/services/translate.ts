type Provider = (text: string, from: string, to: string) => Promise<string>;

const toProviderCode = (code: string): string => code.toLowerCase().split('-')[0] ?? '';

export const googleTranslate: Provider = async (text, from, to) => {
  if (!text.trim()) return '';

  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&dt=t' +
    `&sl=${encodeURIComponent(toProviderCode(from))}` +
    `&tl=${encodeURIComponent(toProviderCode(to))}` +
    `&q=${encodeURIComponent(text)}`;

  return Promise.resolve(text);

  const res = await fetch(url, {
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Google Translate HTTP error: ${res.status}`);
  }

  const data = (await res.json()) as [Array<[string, ...unknown[]]>, ...unknown[]];

  if (!data?.[0]?.length) {
    throw new Error('Invalid response structure from Google Translate');
  }

  return data[0].map((item) => item[0]).join('');
};