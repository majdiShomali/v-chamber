const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs").promises;

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB;

const userRouts = require("./routes/userRouter");
const GoogleLogInRouts = require("./routes/GoogleLogInRouter");
const itemCategotyRouts = require("./routes/itemCategoryRouter");
const notFoundHandler = require("./middleware/404");
const errorHandler = require("./middleware/500");
const Protected = require("./middleware/Protected");
const forgetRouts = require("./routes/forgetRouter");
const relatedItemsRouts = require("./routes/relatedItemRouter");
const paymentRoutes = require("./routes/paymentRoutes");
const CompanyRouts = require("./routes/companyRouter");
const JuiceSizeRouts = require("./routes/productsRouter/juiceRouter/juiceSizeRouter");
const JuiceNikotinRouts = require("./routes/productsRouter/juiceRouter/juiceNikotinRouter");
const JuiceTypeRouts = require("./routes/productsRouter/juiceRouter/juiceTypeRouter");
const JuiceFlavorRouts = require("./routes/productsRouter/juiceRouter/juiceFlavorRouter");
const ProductStickerRoutes = require("./routes/productsRouter/juiceRouter/productStickerRouter");
const uploadImageRoutes = require("./routes/uploadImageRouter");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the "build" folder
app.use(express.static(path.join(__dirname, "../build")));

// Define a route to handle redirects
app.get("/redirect/:target", async (req, res) => {
  try {
    const { target } = req.params;
    const targetPath = path.join(__dirname, "../build", `${target}.html`);

    // Check if the target HTML file exists
    await fs.access(targetPath);

    // Redirect to the specified target
    res.redirect(`/${target}`);
  } catch (err) {
    // Handle errors, e.g., the target file doesn't exist
    res.status(404).send("Not Found");
  }
});

// Define routes for your APIs before the catch-all route
app.use(userRouts);
app.use(paymentRoutes);
app.use(GoogleLogInRouts);
app.use(itemCategotyRouts);
app.use(forgetRouts);
app.use(relatedItemsRouts);
app.use(CompanyRouts);
app.use(JuiceSizeRouts);
app.use(JuiceNikotinRouts);
app.use(JuiceTypeRouts);
app.use(JuiceFlavorRouts);
app.use(ProductStickerRoutes);
app.use(uploadImageRoutes);

// Define a route to handle all other requests and serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);
app.use(Protected);

module.exports = {
  server: app,
  start: async () => {
    try {
      await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error);
    }
  },
};
