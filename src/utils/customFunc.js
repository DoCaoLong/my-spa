export function reduceCart(props){
    let obj = {
          products : [],
          services : [],
          prepay_cards : [],
          treatment_combo : []
    };
    const locationId = props[0].locationId;
    // //console.log('props cart',props);
    for(var i=0;i<props.length;i++){
          switch (props[i].elementType) {
              case 'combo':
                  obj.treatment_combo.push({
                      id: props[i].id,
                      quantity: props[i].quantity
                  })
                  break;
              case 'product':
                  obj.products.push({
                      id: props[i].id,
                      quantity: props[i].quantity
                  })
                  break;
              case 'service':
                  obj.services.push({
                      id: props[i].id,
                      quantity: props[i].quantity
                  })
                  break;
              default:
                  break;
          }
    }
    return {obj,locationId};
}