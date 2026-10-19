import Link from 'next/link';
import Barbell from '../components/Barbell';
import ClassRow from '../components/ClassRow';
import SourceNote from '../components/SourceNote';
import { getClasses, getTrainers, todayName } from '../lib/api';
import { titleCase } from '../lib/plates';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [classes, trainers] = await Promise.all([getClasses(), getTrainers()]);
  const today = todayName();
  const todays = classes.items.filter((c) => c.day === today);

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Load the bar.</h1>
          <p className="lede">
            Five plates, five memberships. Pick the weight you are ready to carry this month and change it whenever
            your training does.
          </p>
          <Barbell />
          <p className="hint">Tap a plate to see the membership that matches it.</p>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>On the floor today</h2>
          <Link href="/classes">Full timetable</Link>
        </div>
        {todays.length ? (
          <ul className="class-list">
            {todays.map((c) => (
              <ClassRow key={c.id} c={c} showDescription={false} />
            ))}
          </ul>
        ) : (
          <p className="empty">No coached classes on {titleCase(today)}. The strength floor is open 5 am to 11 pm.</p>
        )}
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Who will coach you</h2>
          <Link href="/trainers">All coaches</Link>
        </div>
        <ul className="coach-strip">
          {trainers.items.slice(0, 4).map((t) => (
            <li key={t.id}>
              <strong>{t.name}</strong>
              <span className="muted">{t.specialty}</span>
            </li>
          ))}
        </ul>
        <SourceNote source={classes.source} />
      </section>
    </>
  );
}
