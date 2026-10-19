'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { plans, trainers, classes } = require('../src/seed-data');

test('five plans, one per barbell plate, with unique names', () => {
  assert.deepEqual(plans.map((p) => p.plateKg).sort((a, b) => a - b), [5, 10, 15, 20, 25]);
  assert.equal(new Set(plans.map((p) => p.name)).size, plans.length);
});

test('prices rise with plate weight', () => {
  const sorted = [...plans].sort((a, b) => a.plateKg - b.plateKg);
  for (let i = 1; i < sorted.length; i++) assert.ok(sorted[i].priceMonthly > sorted[i - 1].priceMonthly);
});

test('exactly one plan is highlighted', () => {
  assert.equal(plans.filter((p) => p.highlighted).length, 1);
});

test('every class points at a real trainer and uses valid values', () => {
  const slugs = new Set(trainers.map((t) => t.slug));
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  for (const c of classes) {
    assert.ok(slugs.has(c.trainerSlug), `unknown trainer ${c.trainerSlug}`);
    assert.ok(days.includes(c.day), `bad day ${c.day}`);
    assert.match(c.startTime, /^\d{2}:\d{2}:\d{2}\.\d{3}$/);
    assert.ok(c.intensity >= 1 && c.intensity <= 5);
  }
});

test('schema files are valid JSON with matching names', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  for (const name of ['plan', 'trainer', 'gym-class']) {
    const file = path.join(__dirname, '..', 'src', 'api', name, 'content-types', name, 'schema.json');
    const schema = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert.equal(schema.info.singularName, name);
  }
});
