export const request = (url, method = 'GET', body) => {
  return fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => Promise.all([response.status, response.json()]))
}
