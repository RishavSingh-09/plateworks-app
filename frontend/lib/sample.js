// Shown only when the CMS cannot be reached, so the front end can still be demoed on its own.
export const samplePlans = [
  { id: 1, name: 'Warm-up', slug: 'warm-up', plateKg: 5, priceMonthly: 999, currency: 'INR', tagline: 'Get through the door and find your rhythm.', features: ['Off-peak floor access (10 am to 4 pm)', 'Locker and shower', 'One orientation session'], highlighted: false },
  { id: 2, name: 'Working set', slug: 'working-set', plateKg: 10, priceMonthly: 1799, currency: 'INR', tagline: 'Full-day access for people who train three or four times a week.', features: ['Floor access 5 am to 11 pm', 'Two group classes a week', 'Monthly body-composition scan'], highlighted: false },
  { id: 3, name: 'Heavy day', slug: 'heavy-day', plateKg: 15, priceMonthly: 2499, currency: 'INR', tagline: 'Unlimited classes plus a coach who writes your programme.', features: ['Unlimited group classes', 'Written programme, reviewed every 4 weeks', 'Sauna and recovery room'], highlighted: true },
  { id: 4, name: 'Meet prep', slug: 'meet-prep', plateKg: 20, priceMonthly: 3499, currency: 'INR', tagline: 'Two coached sessions a week for lifters with a date on the calendar.', features: ['Two 1:1 coached sessions a week', 'Platform and competition bars', 'Priority class booking'], highlighted: false },
  { id: 5, name: 'Platform', slug: 'platform', plateKg: 25, priceMonthly: 4999, currency: 'INR', tagline: 'Everything we offer, with your own coach and a reserved rack.', features: ['Reserved power rack at peak hours', 'Four 1:1 sessions a month', 'Physio screening each quarter'], highlighted: false },
];

export const sampleTrainers = [
  { id: 1, name: 'Arjun Malhotra', specialty: 'Powerlifting', yearsCoaching: 11, bio: 'Competed nationally for six years before turning to coaching.', certifications: ['IPF Level 2 Coach'], classes: [{}, {}, {}] },
  { id: 2, name: 'Neha Kapoor', specialty: 'Mobility and recovery', yearsCoaching: 8, bio: 'Runs the mobility sessions that keep the heavy lifters training year-round.', certifications: ['Yoga Alliance RYT-200'], classes: [{}, {}, {}] },
  { id: 3, name: 'Rohan Das', specialty: 'Conditioning', yearsCoaching: 6, bio: 'Designs the interval and circuit classes.', certifications: ['CrossFit Level 2'], classes: [{}, {}, {}] },
  { id: 4, name: 'Simran Gill', specialty: 'Olympic lifting', yearsCoaching: 9, bio: 'State-level weightlifter who teaches the snatch and clean and jerk.', certifications: ['USAW Level 1'], classes: [{}, {}, {}] },
];

const t = (name) => ({ name });
export const sampleClasses = [
  { id: 1, title: 'Barbell basics', day: 'monday', startTime: '06:00:00.000', durationMin: 60, intensity: 2, capacity: 14, trainer: t('Arjun Malhotra') },
  { id: 2, title: 'Mobility reset', day: 'monday', startTime: '19:30:00.000', durationMin: 45, intensity: 1, capacity: 20, trainer: t('Neha Kapoor') },
  { id: 3, title: 'Interval floor', day: 'tuesday', startTime: '07:00:00.000', durationMin: 45, intensity: 4, capacity: 18, trainer: t('Rohan Das') },
  { id: 4, title: 'Snatch workshop', day: 'tuesday', startTime: '18:30:00.000', durationMin: 75, intensity: 3, capacity: 10, trainer: t('Simran Gill') },
  { id: 5, title: 'Heavy day', day: 'wednesday', startTime: '06:00:00.000', durationMin: 75, intensity: 5, capacity: 12, trainer: t('Arjun Malhotra') },
  { id: 6, title: 'Mobility reset', day: 'wednesday', startTime: '19:30:00.000', durationMin: 45, intensity: 1, capacity: 20, trainer: t('Neha Kapoor') },
  { id: 7, title: 'Interval floor', day: 'thursday', startTime: '07:00:00.000', durationMin: 45, intensity: 4, capacity: 18, trainer: t('Rohan Das') },
  { id: 8, title: 'Clean and jerk', day: 'thursday', startTime: '18:30:00.000', durationMin: 75, intensity: 4, capacity: 10, trainer: t('Simran Gill') },
  { id: 9, title: 'Barbell basics', day: 'friday', startTime: '06:00:00.000', durationMin: 60, intensity: 2, capacity: 14, trainer: t('Arjun Malhotra') },
  { id: 10, title: 'Friday finisher', day: 'friday', startTime: '18:00:00.000', durationMin: 40, intensity: 5, capacity: 16, trainer: t('Rohan Das') },
  { id: 11, title: 'Open platform', day: 'saturday', startTime: '09:00:00.000', durationMin: 120, intensity: 3, capacity: 12, trainer: t('Simran Gill') },
  { id: 12, title: 'Recovery flow', day: 'sunday', startTime: '10:00:00.000', durationMin: 60, intensity: 1, capacity: 20, trainer: t('Neha Kapoor') },
];
