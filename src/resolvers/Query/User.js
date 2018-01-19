const { getUserId } = require('../../utils/auth')

module.exports = {
  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}
