import { PLATES } from '../lib/plates';

// A weight plate: the number is the kilos, the colour is the competition standard.
export default function Plate({ kg, size = 44, label }) {
  const p = PLATES[kg] || PLATES[5];
  return (
    <span
      className="plate"
      role="img"
      aria-label={label || `${kg} kg ${p.name} plate`}
      style={{ '--plate-bg': p.bg, '--plate-fg': p.fg, '--plate-edge': p.edge, width: size, height: size, fontSize: size * 0.42 }}
    >
      {kg}
    </span>
  );
}
