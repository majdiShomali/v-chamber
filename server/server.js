const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const userRouts = require('./routes/userRouter');
const GoogleLogInRouts = require('./routes/GoogleLogInRouter');
const itemCategotyRouts = require('./routes/itemCategoryRouter');
const notFoundHandler = require('./middleware/404');
const dbURI = process.env.MONGODB
const errorHandler = require('./middleware/500')
const Protected = require('./middleware/Protected')
const forgetRouts = require('./routes/forgetRouter');
const relatedItemsRouts = require('./routes/relatedItemRouter');
const paymentRoutes  = require('./routes/paymentRoutes');
const CompanyRouts = require('./routes/companyRouter');

const JuiceSizeRouts = require('./routes/productsRouter/juiceRouter/juiceSizeRouter');
const JuiceNikotinRouts = require('./routes/productsRouter/juiceRouter/juiceNikotinRouter');
const JuiceTypeRouts = require('./routes/productsRouter/juiceRouter/juiceTypeRouter');
const JuiceFlavorRouts = require('./routes/productsRouter/juiceRouter/juiceFlavorRouter');
const ProductStickerRoutes = require('./routes/productsRouter/juiceRouter/productStickerRouter');
const uploadImageRoutes = require('./routes/uploadImageRouter')
const app = express();
app.use(cors());

const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});


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
app.use('*',notFoundHandler);
app.use(errorHandler);
app.use(Protected)


module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Starting server on port ${PORT}`);
        });
      });
  },
};