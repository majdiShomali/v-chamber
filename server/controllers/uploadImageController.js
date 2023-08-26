const User = require("../models/user");


const errorHandler = (error, req, res) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

const upload = async (req, res) => {
 console.log(req.imagePath,"req.imagePath");
 console.log(req.imageName,"req.imageName");
 console.log(req.imageUrl,"req.imageUrl");
 console.log(req.file.path,"req.file.path");


};


module.exports = {
    upload,
};
