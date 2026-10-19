'use strict';

const seed = require('./seed');

// The website reads content anonymously, so give the Public role read-only access.
// Doing it in code means a fresh database works without clicking through Settings > Roles.
const PUBLIC_READ_ACTIONS = [
  'api::plan.plan.find',
  'api::plan.plan.findOne',
  'api::trainer.trainer.find',
  'api::trainer.trainer.findOne',
  'api::gym-class.gym-class.find',
  'api::gym-class.gym-class.findOne',
];

async function grantPublicReadAccess(strapi) {
  const role = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  if (!role) return;
  const permissions = strapi.query('plugin::users-permissions.permission');
  for (const action of PUBLIC_READ_ACTIONS) {
    const found = await permissions.findOne({ where: { action, role: role.id } });
    if (!found) await permissions.create({ data: { action, role: role.id } });
  }
}

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    await grantPublicReadAccess(strapi);
    if (process.env.SEED_DATA === 'true') await seed(strapi);
  },
};
