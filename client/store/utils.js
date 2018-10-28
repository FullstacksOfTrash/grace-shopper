export const getProduct = (id, products) => products.find(prd => prd.id === parseInt(id))

export const getProductReviews = (id, reviews) => reviews.filter(rvw => rvw.productId === parseInt(id))

export const getCart = (orders) => orders.find( order => order.status === 'CART')

export const authHeader = ()=> {
  return {
    headers: { authorization: window.localStorage.getItem('token')}
  }
}

export const lineItemFinder = (lineItems, productId) => {
  return lineItems.find(lineItem => lineItem.productId === +productId)
}