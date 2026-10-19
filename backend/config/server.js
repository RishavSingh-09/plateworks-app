module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // The address visitors use to reach the CMS, e.g. http://1.2.3.4:1337
  url: env('PUBLIC_URL', ''),
  // true when Strapi sits behind NGINX, so X-Forwarded-* headers are trusted
  proxy: env.bool('IS_PROXIED', false),
  app: { keys: env.array('APP_KEYS') },
});
