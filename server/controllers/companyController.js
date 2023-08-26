const Company = require("../models/companies");
const errorHandler = (error, req, res) => {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  };

  const allCompanies = (req, res) => {
    Company.find()
      .then((data) => { 
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };
  const CompaniesByCategory = (req, res) => {
    const id =req.params.id
    Company.find({categoryId:id})
      .then((data) => { 
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };

  const addCompany = async (req, res) => {
    try {
      const image = req.file.path;
      const data = req.body;
      const Newdata = { ...data, image: image };
      const item = new Company(Newdata);
      const newItem = await item.save();
      res.json(newItem);
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
  const updateCompany = async (req, res) => {
 try {
  const CompanyId = req.params.id;
  const  CompanyData  = req.body;
  console.log(CompanyId,CompanyData);
  const updatedCompany = await Company.findByIdAndUpdate(CompanyId, CompanyData, { new: true });
  console.log(updatedCompany);
  res.json(updatedCompany);
 } catch (error) {
  errorHandler(error, req, res);
 }
  };
  

module.exports = {
    allCompanies,
    addCompany,
    CompaniesByCategory,
    updateCompany,
}; 