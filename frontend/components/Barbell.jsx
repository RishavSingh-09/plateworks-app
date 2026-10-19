import Link from 'next/link';
import { PLATES } from '../lib/plates';

// Side view of a loaded bar. Biggest plates sit against the collar, like on a real bar.
// Each plate links to the membership with the same weight.
const STACK = [
  { kg: 25, h: 220, x: 234 },
  { kg: 20, h: 196, x: 204 },
  { kg: 15, h: 168, x: 174 },
  { kg: 10, h: 134, x: 144 },
  { kg: 5, h: 100, x: 114 },
];
const W = 28;
const CY = 125;

export default function Barbell() {
  const plates = [
    ...STACK.map((s) => ({ ...s, side: 'left' })),
    ...STACK.map((s) => ({ ...s, side: 'right', x: 1000 - s.x - W })),
  ];
  return (
    <svg className="barbell" viewBox="0 0 1000 250" role="group" aria-label="A barbell loaded with five plates. Each plate links to a membership.">
      <rect x="30" y={CY - 6} width="940" height="12" rx="3" fill="#8B9096" />
      <rect x="30" y={CY - 9} width="62" height="18" rx="3" fill="#6E747A" />
      <rect x="908" y={CY - 9} width="62" height="18" rx="3" fill="#6E747A" />
      <rect x="266" y={CY - 23} width="14" height="46" rx="3" fill="#2A3034" />
      <rect x="720" y={CY - 23} width="14" height="46" rx="3" fill="#2A3034" />
      {plates.map((p) => {
        const c = PLATES[p.kg];
        return (
          <Link key={`${p.side}-${p.kg}`} href={`/plans#plate-${p.kg}`} className="bb-plate">
            <title>{`${p.kg} kg plate - see the matching membership`}</title>
            <rect x={p.x} y={CY - p.h / 2} width={W} height={p.h} rx="5" fill={c.bg} stroke={c.edge} strokeWidth="2" />
            <text className="bb-text" x={p.x + W / 2} y={CY} transform={`rotate(-90 ${p.x + W / 2} ${CY})`} textAnchor="middle" dominantBaseline="central" fill={c.fg}>
              {p.kg}
            </text>
          </Link>
        );
      })}
    </svg>
  );
}
