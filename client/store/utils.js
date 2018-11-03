export const getProduct = (id, products) => products.find(prd => prd.id === id*1)
export const getReview = (id, reviews) => reviews.find(rvw => rvw.id === id*1)

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
  let cart = JSON.parse(window.localStorage.getItem('lineItems'))

  if(cart){
    return cart
  } else {
    cart = { lineItems: []}
    window.localStorage.setItem('lineItems', JSON.stringify(cart))

    return JSON.parse(window.localStorage.getItem('lineItems'))
  }
}

export const findLocalLineItem = (productId) => {
  const localCart = JSON.parse(window.localStorage.getItem('lineItems'))
  console.log('finding local cart', localCart)
  return localCart.lineItems.find(item => item.productId === productId*1)
}

export const guestIncrementLineItem = (product) => {
  let localCart = getLocalCart()
  const item = findLocalLineItem(product.id)

  let cart = {}
  if(item){ // if we already created a lineItem for this product, increase the quant of that lineItem

    const filtered = localCart.lineItems.filter(item => item.productId !== product.id*1 )
    const updatedLineItem = {...item, quantity: item.quantity+1}
    cart = {...cart, lineItems: [...filtered, updatedLineItem]}
  } else { // if we're adding a new product to the cart

    cart = {...localCart, lineItems: [...localCart.lineItems, {quantity: 1, productId: product.id}]}
  }
  // set the new object on localStorage
  console.log('add cart ', cart)
  window.localStorage.removeItem('lineItems')
  window.localStorage.setItem('lineItems', JSON.stringify(cart))
}

export const guestDecrementLineItem = (product) => {
  const localCart = getLocalCart()
  const item = findLocalLineItem(product.id)
  console.log('item ', item)
  let cart = {}
  if(item.quantity === 1){ // deleting the line item
    console.log('deleting line item')
    const filtered = localCart.lineItems.filter(item => item.productId !== product.id*1 )
    cart = {...localCart, lineItems: filtered}
  } else { // decrementing line item quantity
    console.log('decrementing line item')
    const filtered = localCart.lineItems.filter(item => item.productId !== product.id*1 )
    const updatedLineItem = {...item, quantity: item.quantity-1}
    cart = {...localCart, lineItems: [...filtered, updatedLineItem]}
  }
  // set the new object on localStorage
  console.log('decrement cart ', cart)
  window.localStorage.removeItem('lineItems')
  window.localStorage.setItem('lineItems', JSON.stringify(cart))
}
