const FullRegistry = `
{
  id
  name
  description
  direction
  locations
  price
  spaces
  operation
  categories
  expenses {
    name
    price
  }
  images
  amenities {
    description
    icon
    type
  }
  featured
  summary {
    name
    value
  }
}
`

module.exports = {
  FullRegistry
}