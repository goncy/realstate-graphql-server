const { getUserId } = require('../../utils/auth')
const {flattenProp, matchQuery} = require('../../utils/selectors')
const {FullRegistry} = require("../../fragments/Registry")

module.exports = {
  registryByID: (parent, {id}, ctx) => ctx.db.query.registry({ where: { id }}),
  registriesProp: async (parent, {prop}, ctx) => {
    const registries = await ctx.db.query.registries(null, `{ ${prop} }`)
    return flattenProp(prop, registries)
  },
  registriesByQuery: async (parent, {query}, ctx) => {
    const registries = await ctx.db.query.registries({where: {operation: query.operation}}, FullRegistry)
    return matchQuery(query, registries)
  },
  featuredRegistriesByOperation: async (parent, {operation}, ctx) => await ctx.db.query.registries({where: {
    featured: true,
    operation
  }}, FullRegistry)
}
