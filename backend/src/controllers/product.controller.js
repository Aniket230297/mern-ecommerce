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

    // Support both paginated and all-products requests
    const isAll = req.query.limit === "all";

    const page = Math.max(
      1,
      parseInt(req.query.page, 10) || 1
    );

    const limit = isAll
      ? null
      : Math.min(
          50,
          Math.max(1, parseInt(req.query.limit, 10) || 8)
        );

    const skip = isAll ? 0 : (page - 1) * limit;

    const query = {};

    // Search
    if (keyword?.trim()) {
      query.name = {
        $regex: keyword.trim(),
        $options: "i",
      };
    }

    // Category
    if (category) {
      query.category = category;
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice !== "" && minPrice !== undefined) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice !== "" && maxPrice !== undefined) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Sorting
    let sortOptions = {};

    if (sort === "price_asc") {
      sortOptions = { price: 1 };
    } else if (sort === "price_desc") {
      sortOptions = { price: -1 };
    } else if (sort === "newest") {
      sortOptions = { createdAt: -1 };
    }

    // Build query
    let productQuery = Product.find(query)
      .populate("category")
      .sort(sortOptions);

    if (!isAll) {
      productQuery = productQuery
        .skip(skip)
        .limit(limit);
    }

    const [products, totalProducts] = await Promise.all([
      productQuery,
      Product.countDocuments(query),
    ]);

    const totalPages = isAll
      ? 1
      : Math.ceil(totalProducts / limit);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
      pagination: {
        currentPage: page,
        limit: isAll ? "all" : limit,
        totalProducts,
        totalPages,
        hasNextPage: !isAll && page < totalPages,
        hasPrevPage: !isAll && page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
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