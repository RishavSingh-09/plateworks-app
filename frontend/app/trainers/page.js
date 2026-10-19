import SourceNote from '../../components/SourceNote';
import { getTrainers, mediaUrl } from '../../lib/api';
import { PLATES } from '../../lib/plates';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Coaches - Plateworks' };

const initials = (name = '') => name.split(' ').map((w) => w[0]).slice(0, 2).join('');
const KGS = [25, 20, 15, 10];

export default async function Trainers() {
  const { items, source } = await getTrainers();
  return (
    <div className="wrap section">
      <h1 className="page-title">Coaches</h1>
      <p className="lede">Every coach here still trains. Ask them what they are working on.</p>
      <ul className="coach-list">
        {items.map((t, i) => {
          const c = PLATES[KGS[i % KGS.length]];
          const photo = mediaUrl(t.photo);
          return (
            <li key={t.id} className="coach-row">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="coach-photo" src={photo} alt={t.name} width="96" height="96" />
              ) : (
                <span className="coach-photo coach-initials" style={{ background: c.bg, color: c.fg }} aria-hidden="true">
                  {initials(t.name)}
                </span>
              )}
              <div>
                <h2>{t.name}</h2>
                <p className="muted">
                  {t.specialty}
                  {t.yearsCoaching ? `, ${t.yearsCoaching} years coaching` : ''}
                </p>
                <p>{t.bio}</p>
                {Array.isArray(t.certifications) && t.certifications.length ? (
                  <p className="muted">{t.certifications.join(', ')}</p>
                ) : null}
                {Array.isArray(t.classes) && t.classes.length ? (
                  <p className="coach-classes">Leads {t.classes.length} classes a week</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
      <SourceNote source={source} />
    </div>
  );
}
