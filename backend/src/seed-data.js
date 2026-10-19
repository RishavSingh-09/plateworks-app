'use strict';

// Sample content for the lab. Pure data (no Strapi imports) so it can be unit-tested.

const plans = [
  {
    name: 'Warm-up', slug: 'warm-up', plateKg: 5, priceMonthly: 999, currency: 'INR',
    tagline: 'Get through the door and find your rhythm.',
    features: ['Off-peak floor access (10 am to 4 pm)', 'Locker and shower', 'One orientation session'],
    highlighted: false,
  },
  {
    name: 'Working set', slug: 'working-set', plateKg: 10, priceMonthly: 1799, currency: 'INR',
    tagline: 'Full-day access for people who train three or four times a week.',
    features: ['Floor access 5 am to 11 pm', 'Two group classes a week', 'Monthly body-composition scan'],
    highlighted: false,
  },
  {
    name: 'Heavy day', slug: 'heavy-day', plateKg: 15, priceMonthly: 2499, currency: 'INR',
    tagline: 'Unlimited classes plus a coach who writes your programme.',
    features: ['Unlimited group classes', 'Written programme, reviewed every 4 weeks', 'Sauna and recovery room', 'Bring a friend on Sundays'],
    highlighted: true,
  },
  {
    name: 'Meet prep', slug: 'meet-prep', plateKg: 20, priceMonthly: 3499, currency: 'INR',
    tagline: 'Two coached sessions a week for lifters with a date on the calendar.',
    features: ['Two 1:1 coached sessions a week', 'Platform and competition bars', 'Nutrition check-in every fortnight', 'Priority class booking'],
    highlighted: false,
  },
  {
    name: 'Platform', slug: 'platform', plateKg: 25, priceMonthly: 4999, currency: 'INR',
    tagline: 'Everything we offer, with your own coach and a reserved rack.',
    features: ['Reserved power rack at peak hours', 'Four 1:1 sessions a month', 'Physio screening each quarter', 'Guest passes (4 a month)'],
    highlighted: false,
  },
];

const trainers = [
  {
    name: 'Arjun Malhotra', slug: 'arjun-malhotra', specialty: 'Powerlifting', yearsCoaching: 11,
    bio: 'Competed nationally for six years before turning to coaching. Arjun builds programmes around the big three lifts and is blunt about technique.',
    certifications: ['IPF Level 2 Coach', 'NSCA-CSCS'],
  },
  {
    name: 'Neha Kapoor', slug: 'neha-kapoor', specialty: 'Mobility and recovery', yearsCoaching: 8,
    bio: 'Former physiotherapy assistant. Neha runs the mobility sessions that keep the heavy lifters training year-round.',
    certifications: ['Functional Range Conditioning', 'Yoga Alliance RYT-200'],
  },
  {
    name: 'Rohan Das', slug: 'rohan-das', specialty: 'Conditioning', yearsCoaching: 6,
    bio: 'Rohan designs the interval and circuit classes. Expect short rests, loud music and a very honest stopwatch.',
    certifications: ['CrossFit Level 2', 'Precision Nutrition L1'],
  },
  {
    name: 'Simran Gill', slug: 'simran-gill', specialty: 'Olympic lifting', yearsCoaching: 9,
    bio: 'State-level weightlifter. Simran teaches the snatch and clean and jerk from empty-bar basics to competition technique.',
    certifications: ['USAW Level 1', 'Indian Weightlifting Federation Coach'],
  },
];

// intensity: 1 = 5 kg plate ... 5 = 25 kg plate
const classes = [
  { title: 'Barbell basics', day: 'monday', startTime: '06:00:00.000', durationMin: 60, intensity: 2, capacity: 14, trainerSlug: 'arjun-malhotra', description: 'Squat, bench and deadlift technique with an empty bar and light plates.' },
  { title: 'Mobility reset', day: 'monday', startTime: '19:30:00.000', durationMin: 45, intensity: 1, capacity: 20, trainerSlug: 'neha-kapoor', description: 'Hips, shoulders and thoracic spine. Come as you are.' },
  { title: 'Interval floor', day: 'tuesday', startTime: '07:00:00.000', durationMin: 45, intensity: 4, capacity: 18, trainerSlug: 'rohan-das', description: 'Work and rest blocks on rower, sled and kettlebells.' },
  { title: 'Snatch workshop', day: 'tuesday', startTime: '18:30:00.000', durationMin: 75, intensity: 3, capacity: 10, trainerSlug: 'simran-gill', description: 'Drills, positions and heavy singles.' },
  { title: 'Heavy day', day: 'wednesday', startTime: '06:00:00.000', durationMin: 75, intensity: 5, capacity: 12, trainerSlug: 'arjun-malhotra', description: 'Top sets and back-off work. Chalk allowed.' },
  { title: 'Mobility reset', day: 'wednesday', startTime: '19:30:00.000', durationMin: 45, intensity: 1, capacity: 20, trainerSlug: 'neha-kapoor', description: 'Hips, shoulders and thoracic spine. Come as you are.' },
  { title: 'Interval floor', day: 'thursday', startTime: '07:00:00.000', durationMin: 45, intensity: 4, capacity: 18, trainerSlug: 'rohan-das', description: 'Work and rest blocks on rower, sled and kettlebells.' },
  { title: 'Clean and jerk', day: 'thursday', startTime: '18:30:00.000', durationMin: 75, intensity: 4, capacity: 10, trainerSlug: 'simran-gill', description: 'Pulls, front squats, jerk dips and heavy complexes.' },
  { title: 'Barbell basics', day: 'friday', startTime: '06:00:00.000', durationMin: 60, intensity: 2, capacity: 14, trainerSlug: 'arjun-malhotra', description: 'Squat, bench and deadlift technique with an empty bar and light plates.' },
  { title: 'Friday finisher', day: 'friday', startTime: '18:00:00.000', durationMin: 40, intensity: 5, capacity: 16, trainerSlug: 'rohan-das', description: 'One long, hard circuit to end the week.' },
  { title: 'Open platform', day: 'saturday', startTime: '09:00:00.000', durationMin: 120, intensity: 3, capacity: 12, trainerSlug: 'simran-gill', description: 'Coached open session on the lifting platforms.' },
  { title: 'Recovery flow', day: 'sunday', startTime: '10:00:00.000', durationMin: 60, intensity: 1, capacity: 20, trainerSlug: 'neha-kapoor', description: 'Slow mobility work followed by sauna time.' },
];

module.exports = { plans, trainers, classes };
