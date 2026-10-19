import Plate from './Plate';
import { formatTime } from '../lib/unwrap';
import { intensityToKg } from '../lib/plates';

export default function ClassRow({ c, showDescription = true }) {
  return (
    <li className="class-row">
      <time className="class-time">{formatTime(c.startTime)}</time>
      <div className="class-main">
        <strong>{c.title}</strong>
        {showDescription && c.description ? <span className="muted">{c.description}</span> : null}
      </div>
      <span className="class-coach">{c.trainer && c.trainer.name ? c.trainer.name : 'Floor team'}</span>
      <span className="class-len">{c.durationMin} min</span>
      <Plate kg={intensityToKg(c.intensity)} size={34} label={`Intensity ${c.intensity} of 5, ${intensityToKg(c.intensity)} kg plate`} />
    </li>
  );
}
