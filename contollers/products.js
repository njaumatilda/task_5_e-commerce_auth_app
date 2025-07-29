import productModel from "../models/Product.js"
import { mongoose } from "../db.js"

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find()

    res.status(200).json(allProducts)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const addProducts = async (req, res) => {
  try {
    const { productName, cost, productImages, description, stockStatus } =
      req.body

    const { role } = req.user
    if (role !== "admin") {
      return res.status(401).json({
        message: "You don't have the permissions to add products",
      })
    }

    await productModel.create({
      productName,
      ownerId: req.user.userId,
      cost,
      productImages,
      description,
      stockStatus,
    })

    res.status(201).json({
      message: "Product added successfully",
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteProducts = async (req, res) => {
  const { id } = req.params

  try {
    const checkForValidId = mongoose.Types.ObjectId.isValid(id)
    if (!checkForValidId) {
      return res.status(400).json({
        message: "Invalid ID format",
      })
    }

    const findProductToDelete = await productModel.findById({ _id: id })
    if (!findProductToDelete) {
      return res.status(404).json({
        message: "Product does not exist",
      })
    }

    const { role } = req.user
    if (role !== "admin") {
      return res.status(401).json({
        message: "You don't have the permissions to delete products",
      })
    }

    const deletedProduct = await productModel.findByIdAndDelete(id)
    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export { getAllProducts, addProducts, deleteProducts }
