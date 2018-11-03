export const getProduct = (id, products) => products.find(prd => prd.id === parseInt(id))
export const getReview = (id, reviews) => reviews.find(rvw => rvw.id === parseInt(id))

// export const getProductReviews = (id, reviews) => reviews.filter(rvw => rvw.productId === parseInt(id))

export const getCart = (orders) => orders.find( order => order.status === 'CART')

export const authHeader = ()=> {
  return {
    headers: { authorization: window.localStorage.getItem('token')}
  }
}

export const lineItemFinder = (lineItems, productId) => {
  return lineItems.find(lineItem => lineItem.productId === +productId)
}

export const lineItemsTotalQuant = (lineItems, products) => {
  return lineItems.reduce( (acc, item) => {
    return acc + item.quantity * getProduct(item.productId, products).price
  },0)
}

export const queryFilter = (query, products) => {
  const querySearch = new RegExp(query, 'i')
  return products.filter(product => querySearch.test(product.name))
}

export const getLocalCart = () => {
  return JSON.parse(window.localStorage.getItem('lineItems'))
}

export const findLocalLineItem = (productId) => {
  const localCart = JSON.parse(window.localStorage.getItem('lineItems'))
  return localCart.lineItems.find(item => item.productId === productId*1)
}
