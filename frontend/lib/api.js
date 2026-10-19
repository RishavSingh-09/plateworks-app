import { unwrap } from './unwrap';
import { samplePlans, sampleTrainers, sampleClasses } from './sample';

// Server-side only. Read at request time (pages are force-dynamic), so one image works in every environment.
//   STRAPI_INTERNAL_URL  how this container reaches the CMS (compose service / k8s Service DNS)
//   STRAPI_PUBLIC_URL    how a visitor's browser reaches uploaded media (or the CloudFront URL)
const INTERNAL = process.env.STRAPI_INTERNAL_URL || 'http://localhost:1337';
const PUBLIC = process.env.STRAPI_PUBLIC_URL || INTERNAL;

export function mediaUrl(file) {
  const url = file && file.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `${PUBLIC}${url}`;
}

async function load(path, sample) {
  try {
    const res = await fetch(`${INTERNAL}/api/${path}`, { cache: 'no-store', signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error(`CMS returned ${res.status}`);
    const json = await res.json();
    const items = unwrap(json.data);
    if (!Array.isArray(items) || items.length === 0) return { items: sample, source: 'sample' };
    return { items, source: 'cms' };
  } catch (err) {
    console.warn(`[cms] ${path} failed: ${err.message} - using sample content`);
    return { items: sample, source: 'sample' };
  }
}

export const getPlans = async () => {
  const r = await load('plans?sort=plateKg:asc&pagination[pageSize]=20', samplePlans);
  return r;
};

export const getTrainers = () => load('trainers?populate=photo,classes&pagination[pageSize]=20', sampleTrainers);

export const getClasses = () =>
  load('gym-classes?populate=trainer&sort=startTime:asc&pagination[pageSize]=100', sampleClasses);

export const todayName = () =>
  new Date()
    .toLocaleDateString('en-US', { weekday: 'long', timeZone: process.env.GYM_TIMEZONE || 'Asia/Kolkata' })
    .toLowerCase();
