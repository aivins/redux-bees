import queryString from 'query-string';

export default function applyUrlWithPlaceholders(url, placeholders, noEncode = []) {
  const query = {};

  const completeUrl = Object.keys(placeholders).reduce((acc, key) => {
    const token = `:${key}`;

    if (acc.indexOf(token) !== -1) {
      const value = noEncode.includes(key) ?
        placeholders[key] : encodeURIComponent(placeholders[key]);
      return acc.replace(token, value);
    }

    if (placeholders[key] !== null) {
      query[key] = placeholders[key];
    }

    return acc;
  }, url);

  if (Object.keys(query).length > 0) {
    return `${completeUrl}?${queryString.stringify(query)}`;
  }

  return completeUrl;
}


