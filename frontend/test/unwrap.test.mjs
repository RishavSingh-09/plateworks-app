import test from 'node:test';
import assert from 'node:assert/strict';
import { unwrap, formatTime } from '../lib/unwrap.js';

test('flattens a Strapi v4 entry', () => {
  const out = unwrap({ data: [{ id: 3, attributes: { title: 'Heavy day', intensity: 5 } }] });
  assert.deepEqual(out, [{ id: 3, title: 'Heavy day', intensity: 5 }]);
});

test('flattens nested relations', () => {
  const out = unwrap([{ id: 1, attributes: { title: 'Interval floor', trainer: { data: { id: 7, attributes: { name: 'Rohan Das' } } } } }]);
  assert.equal(out[0].trainer.name, 'Rohan Das');
});

test('empty relation becomes null', () => {
  const out = unwrap([{ id: 1, attributes: { photo: { data: null } } }]);
  assert.equal(out[0].photo, null);
});

test('formats times', () => {
  assert.equal(formatTime('06:00:00.000'), '6:00 am');
  assert.equal(formatTime('19:30:00.000'), '7:30 pm');
  assert.equal(formatTime('12:05:00.000'), '12:05 pm');
  assert.equal(formatTime('00:15:00.000'), '12:15 am');
});
