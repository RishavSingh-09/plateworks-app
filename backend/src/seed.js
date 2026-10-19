'use strict';

const { plans, trainers, classes } = require('./seed-data');

/**
 * Inserts sample content once. Skips if any plan already exists, so it is safe on every boot.
 * Enabled with SEED_DATA=true.
 */
module.exports = async function seed(strapi) {
  const existing = await strapi.entityService.count('api::plan.plan');
  if (existing > 0) {
    strapi.log.info('[seed] content already present - skipping');
    return;
  }

  const publishedAt = new Date();
  const trainerIds = {};

  for (const t of trainers) {
    const entry = await strapi.entityService.create('api::trainer.trainer', { data: { ...t, publishedAt } });
    trainerIds[t.slug] = entry.id;
  }
  for (const p of plans) {
    await strapi.entityService.create('api::plan.plan', { data: { ...p, publishedAt } });
  }
  for (const { trainerSlug, ...c } of classes) {
    await strapi.entityService.create('api::gym-class.gym-class', {
      data: { ...c, trainer: trainerIds[trainerSlug], publishedAt },
    });
  }
  strapi.log.info(`[seed] created ${trainers.length} trainers, ${plans.length} plans, ${classes.length} classes`);
};
