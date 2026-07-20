import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProducts,
      totalCategories,
      totalOrders,
      totalUsers,
      recentOrders,
      recentProducts,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),

      Order.find()
        .populate("user", "name")
        .sort({ createdAt: -1 })
        .limit(5),

      Product.find()
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.json({
      success: true,

      stats: {
        totalProducts,
        totalCategories,
        totalOrders,
        totalUsers,
      },

      recentOrders,

      recentProducts,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};