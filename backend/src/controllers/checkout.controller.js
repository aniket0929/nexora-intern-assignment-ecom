export const checkout = async (req, res) => {
  try {
    const { user, cartItems } = req.body;

    if (!user || !user.name || !user.email)
      return res.status(400).json({ msg: "User details missing" });

    if (!cartItems || cartItems.length === 0)
      return res.status(400).json({ msg: "Cart is empty" });

    // format each item and calculate subtotal
    const formattedItems = cartItems.map((i) => ({
      name: i.productId.name,
      price: i.productId.price,
      qty: i.qty,
      subtotal: i.productId.price * i.qty,
    }));

    // calculate total
    const total = formattedItems.reduce((sum, i) => sum + i.subtotal, 0);

    // send invoice-style response
    res.json({
      msg: "Checkout successful",
      user: {
        name: user.name,
        email: user.email,
      },
      items: formattedItems,
      total,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
