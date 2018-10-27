export const getProduct = (id, products) => products.find(prd => prd.id === parseInt(id))

export const getProductReviews = (id, reviews) => reviews.filter(rvw => rvw.productId === parseInt(id))

export const getCart = (orders) => orders.find( order => order.status === 'CART')
