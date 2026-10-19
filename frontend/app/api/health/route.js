export const dynamic = 'force-dynamic';
 
// Used by the Docker HEALTHCHECK, the deploy script and the Jenkins smoke test.
// It does not call the CMS, so it stays "ok" even if the CMS is down.
export function GET() {
  return Response.json({ status: 'ok', service: 'plateworks-web' });
}
