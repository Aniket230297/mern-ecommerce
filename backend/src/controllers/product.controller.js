import Product from "../models/product.model.js";

/* =====================================
   Create Product
===================================== */

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      brand,
      category,
      stock,
      images,
      isFeatured,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !brand ||
      !category ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      brand,
      category,
      stock,
      images,
      isFeatured,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================
   Get All Products
===================================== */


export const getAllProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      sort,
    } = req.query;

    const query = {};

    // Search
    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    // Category
    if (category) {
      query.category = category;
    }

    // Price
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice)
        query.price.$gte = Number(minPrice);

      if (maxPrice)
        query.price.$lte = Number(maxPrice);
    }

    let products = Product.find(query).populate("category");

    // Sorting
    if (sort === "price_asc") {
      products = products.sort({ price: 1 });
    }

    if (sort === "price_desc") {
      products = products.sort({ price: -1 });
    }

    if (sort === "newest") {
      products = products.sort({ createdAt: -1 });
    }

    const result = await products;

    res.status(200).json({
      success: true,
      count: result.length,
      products: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================
   Get Single Product
===================================== */

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================
   Update Product
===================================== */

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================
   Delete Product
===================================== */

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};