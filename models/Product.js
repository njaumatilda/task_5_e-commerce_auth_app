import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
      trim: true,
    },
    productImages: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    stockStatus: {
      type: String,
      required: true,
      enum: ["in-stock", "low-stock", "out-of-stock"],
      trim: true,
    },
  },
  { timestamps: true, strict: true }
)

export default mongoose.model("product", productSchema)
