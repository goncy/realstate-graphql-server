const R = require('ramda')

const flattenProp = (_, results) => R.pipe(R.pluck(_), R.flatten, R.uniq)(results)
const arrayContains = arr => R.any(_ => R.contains(_, arr))
const optionalEquals = prop => _ =>
  R.either(R.isNil, R.equals(0))(prop) ? true : R.equals(_, prop)

const formDataToGraphcool = R.pipe(
  R.dissoc('id'),
  R.mapObjIndexed(
    R.when(
      R.is(Array),
      R.ifElse(
        R.isEmpty,
        R.objOf('create'),
        R.ifElse(
          R.pipe(R.head, R.is(Object)),
          R.objOf('create'),
          R.objOf('set')
        )
      )
    )
  )
)

const matchQuery = ({categories, locations, spaces}, results) => R.filter(
  R.where({
    categories: arrayContains(categories),
    locations: arrayContains(locations),
    spaces: optionalEquals(spaces)
  })
)(results)

module.exports = {
  formDataToGraphcool,
  flattenProp,
  matchQuery
}