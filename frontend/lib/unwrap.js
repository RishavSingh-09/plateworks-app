// Strapi v4 wraps every entry as { id, attributes: {...} } and relations as { data: ... }.
// This flattens the response into plain objects the components can use.
export function unwrap(x) {
  if (x === null || x === undefined) return x;
  if (Array.isArray(x)) return x.map(unwrap);
  if (typeof x !== 'object') return x;
  if ('attributes' in x) return { id: x.id, ...unwrap(x.attributes) };
  if ('data' in x && Object.keys(x).every((k) => k === 'data' || k === 'meta')) return unwrap(x.data);
  const out = {};
  for (const key of Object.keys(x)) out[key] = unwrap(x[key]);
  return out;
}

// "06:00:00.000" -> "6:00 am"
export function formatTime(value) {
  if (!value) return '';
  const [h, m] = value.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}
