export function validateImageByPOST(url: string) {
  return fetch("/api/validate-image", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({url}),
  })
    .then((res) => res.json())
    .then((res) => res.ok)
    .catch(() => false);
}
