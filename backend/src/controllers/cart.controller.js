import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.json({ items: [], total: 0, count: 0 });

    const total = cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );
    const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
    res.json({ items: cart.items, total, count });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, qty = 1 } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) item.qty += qty;
    else cart.items.push({ productId, qty });

    await cart.save();
    await cart.populate("items.productId");
    
    const total = cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );
    const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
    
    res.json({ items: cart.items, total, count });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter(i => i._id.toString() !== id);
    await cart.save();
    await cart.populate("items.productId");
    
    const total = cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );
    const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
    
    res.json({ items: cart.items, total, count });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
