/**
 * Potential script. Can tweak to push custom quantity variable to cart quantity.
 */
var cartId = new sn_sc.CartJS().getCartID();
var quantity = 0;
var item = new GlideRecord('sc_cart_item');
item.addQuery('cart', cartId);
item.query();
while (item.next()) {
  quantity = quantity + item.quantity;
}

gs.print(quantity);
