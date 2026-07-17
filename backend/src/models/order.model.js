import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        image: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      street: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      postalCode: {
        type: String,
        required: true,
        trim: true,
      },

      country: {
        type: String,
        required: true,
        trim: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "ONLINE"],
    },
    paymentResult: {
      transactionId: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        default: "",
      },

      paidAt: {
        type: Date,
      },
    },
    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
    itemsPrice: {
  type: Number,
  required: true,
  default: 0,
},

shippingPrice: {
  type: Number,
  required: true,
  default: 0,
},

taxPrice: {
  type: Number,
  required: true,
  default: 0,
},

totalPrice: {
  type: Number,
  required: true,
  default: 0,
},
    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
