function formatCartId(org_id, type_id, item_id) {
      // org_id + type_id + item.id

      // product: type_1,
      // services: type_2,
      // combo: type_3
      const cartId = parseInt(`${org_id}${type_id}${item_id}`)
      return cartId
}
export default formatCartId;