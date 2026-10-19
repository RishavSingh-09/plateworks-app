import Plate from '../../components/Plate';
import SourceNote from '../../components/SourceNote';
import { getPlans } from '../../lib/api';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Plans - Plateworks' };

const money = (value, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);

export default async function Plans() {
  const { items, source } = await getPlans();
  return (
    <div className="wrap section">
      <h1 className="page-title">Memberships, priced by the plate</h1>
      <p className="lede">Heavier plate, more coaching. No joining fee, cancel any month.</p>
      <ol className="plan-list">
        {items.map((p) => (
          <li key={p.id} id={`plate-${p.plateKg}`} className={`plan-row${p.highlighted ? ' plan-featured' : ''}`}>
            <Plate kg={p.plateKg} size={84} />
            <div className="plan-main">
              <h2>{p.name}</h2>
              {p.highlighted ? <span className="plan-flag">Most picked</span> : null}
              <p>{p.tagline}</p>
            </div>
            <ul className="plan-features">
              {(p.features || []).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="plan-price">
              <strong>{money(p.priceMonthly, p.currency)}</strong>
              <span className="muted"> a month</span>
            </p>
          </li>
        ))}
      </ol>
      <SourceNote source={source} />
    </div>
  );
}
