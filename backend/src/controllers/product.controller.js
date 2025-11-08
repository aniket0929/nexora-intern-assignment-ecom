import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    let products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    if (total === 0) {
      // Insert mock data once - create 25 products for pagination testing
      const mock =[
        { name: "Laptop", price: 50000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
        { name: "Phone", price: 20000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
        { name: "Headphones", price: 3000, image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439" },
        { name: "Keyboard", price: 2500, image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68" },
        { name: "Mouse", price: 800, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3" },
        { name: "Monitor", price: 15000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
        { name: "Tablet", price: 25000, image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231" },
        { name: "Smartwatch", price: 12000, image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f" },
        { name: "Camera", price: 35000, image: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e" },
        { name: "Speaker", price: 5000, image: "https://images.unsplash.com/photo-1606813902916-7c96b8e1f5ae" },
        { name: "USB Drive", price: 500, image: "https://images.unsplash.com/photo-1580906855280-92f0b1736c88" },
        { name: "Webcam", price: 3000, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3" },
        { name: "Microphone", price: 4000, image: "https://images.unsplash.com/photo-1616469829934-3d9236a06b9b" },
        { name: "Router", price: 2000, image: "https://images.unsplash.com/photo-1603791452906-bc3c1f2e2d3e" },
        { name: "SSD", price: 6000, image: "https://images.unsplash.com/photo-1610465299996-4f3a52f8891f" },
        { name: "RAM", price: 4000, image: "https://images.unsplash.com/photo-1624705002806-289c9bb31c32" },
        { name: "Graphics Card", price: 40000, image: "https://images.unsplash.com/photo-1629904853670-1d93a6df7da0" },
        { name: "Motherboard", price: 12000, image: "https://images.unsplash.com/photo-1616627983134-2b81cb39b9e7" },
        { name: "Power Supply", price: 5000, image: "https://images.unsplash.com/photo-1606813902787-506d2d6b92a7" },
        { name: "CPU", price: 25000, image: "https://images.unsplash.com/photo-1624388013039-b9a6d7adf5a0" },
        { name: "Cooling Fan", price: 1500, image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9" },
        { name: "Case", price: 3000, image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5" },
        { name: "Cable", price: 300, image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9" },
        { name: "Adapter", price: 800, image: "https://images.unsplash.com/photo-1616627983173-20899c30d2f8" },
        { name: "Charger", price: 1200, image: "https://images.unsplash.com/photo-1580910051071-d77b9e55a57e" }
      ]
      
      ;
      await Product.insertMany(mock);
      products = await Product.find().skip(skip).limit(limit);
    }

    res.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
