/**
 * Potential script. Can tweak to push custom quantity variable to cart quantity.
 *
 * There are limitation to the OOB sc_cart_item.quantity field. It is a choice list that caps at 10.
 * If you raise this, it raises across the platform. You could use g_cart.setQuantity(XX) to set the quantity with an if statement but
 * again you are limited to the choices associated with the OOB quantity (max 10).
 *
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
