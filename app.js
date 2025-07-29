import "dotenv/config"
import express from "express"

import { dbConnect } from "./db.js"
import usersRoutes from "./routes/users-auth.js"
import productsRoutes from "./routes/products.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use("/auth", usersRoutes)
app.use("/products", productsRoutes)

app.get("/", (req, res) => {
  res.json({message: "Deployment successful"})
})

app.listen(PORT, () => {
  console.log(`[server]: App listening on port: ${PORT}`)
  dbConnect()
})
