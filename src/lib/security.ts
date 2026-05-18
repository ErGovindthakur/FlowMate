export function isSafeUrl(
  url: string
) {

  const blocked =
    [
      "localhost",
      "127.0.0.1",
      "0.0.0.0",
    ];

  return !blocked.some((item) =>
    url.includes(item)
  );
}