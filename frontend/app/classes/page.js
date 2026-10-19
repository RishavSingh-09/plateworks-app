import ClassRow from '../../components/ClassRow';
import Plate from '../../components/Plate';
import SourceNote from '../../components/SourceNote';
import { getClasses, todayName } from '../../lib/api';
import { DAYS, titleCase } from '../../lib/plates';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Classes - Plateworks' };

export default async function Classes() {
  const { items, source } = await getClasses();
  const today = todayName();
  const byDay = DAYS.map((d) => ({ day: d, list: items.filter((c) => c.day === d) })).filter((g) => g.list.length);

  return (
    <div className="wrap section">
      <h1 className="page-title">Weekly timetable</h1>
      <p className="lede">The plate beside each class shows how hard it is, from a 5 kg warm-up to a 25 kg grind.</p>
      <div className="legend" aria-label="Intensity legend">
        {[5, 10, 15, 20, 25].map((kg) => (
          <span key={kg} className="legend-item">
            <Plate kg={kg} size={26} /> {['Easy', 'Steady', 'Solid', 'Hard', 'Max'][[5, 10, 15, 20, 25].indexOf(kg)]}
          </span>
        ))}
      </div>
      {byDay.map((g) => (
        <section key={g.day} className="day-block" aria-labelledby={`day-${g.day}`}>
          <h2 id={`day-${g.day}`}>
            {titleCase(g.day)}
            {g.day === today ? <span className="today-tag">Today</span> : null}
          </h2>
          <ul className="class-list">
            {g.list.map((c) => (
              <ClassRow key={c.id} c={c} />
            ))}
          </ul>
        </section>
      ))}
      <SourceNote source={source} />
    </div>
  );
}
