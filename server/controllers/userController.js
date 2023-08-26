// 1- calling the model
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const SECRETKEY = process.env.SECRETKEY;
const NODEMAILER_USER=process.env.NODEMAILER_USER
const NODEMAILER_PASS=process.env.NODEMAILER_PASS

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

const errorHandler = (error, req, res) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

const userData = async (req, res) => {
  const id = req.user.id;
  const user = await User.find({ _id: id });
  res.json(user);
};

const allUsers = (req, res) => {
  User.find({ role: 0 })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const allProviders = (req, res) => {
  User.find({ role: 2 })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const allAdmins = (req, res) => {
  User.find({ role: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const oneUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  res.json(user);
};

const verifyOldEmail = async (req, res) => {
  
  const { email, Pin } = req.body;
  const user = await User.find({ email: email });
if (Pin == user[0].pinCode) {
  const Newuser = await User.findByIdAndUpdate(
    user[0]._id,
    { flag: true },
    { new: true }
  );
  const updatedUser = await Newuser.save();
  const token = jwt.sign(
    {
      id: updatedUser._id,
      userName: updatedUser.userName,
      role: updatedUser.role,
    },
    SECRETKEY,
    { expiresIn: "24h" }
  );
  return res.json({ updatedUser, token });
} else {
  return res.status(500).json({ error: "Check PIN code" });
}


};

const newUser = async (req, res) => {
  const { userName, email, password, role, phone ,DateOfBirth} = req.body;
  const user = await User.find({ email: email });
  if (user.length === 0) {
    // Generate a random PIN code
    const pinCode = randomstring.generate({
      length: 6, // Change the length of the PIN code as required
      charset: "numeric",
    });

    // Send the PIN code to the user's email
    const mailOptions = {
      from: NODEMAILER_USER,
      to: email,
      subject: "Password Reset PIN Code",
      text: `Your PIN code for password reset is: ${pinCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to send the PIN code" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ message: "PIN code sent to email" });
      }
    });

    const hashPassword = await bcrypt.hash(password, 5);
    const user = new User({
      userName: userName,
      email: email,
      password: hashPassword,
      role: role,
      DateOfBirth: DateOfBirth,
      phone: phone,
      pinCode: pinCode,
    });
    const newUser = await user.save();
    // const token = jwt.sign(
    //   { id: user._id, userName: user.userName, role: user.role },
    //   SECRETKEY,
    //   { expiresIn: "24h" }
    // );
    // res.json({ token ,newUser});
    res.json(newUser);
  } else {
    res.json({ error: "user alredy exist" });
  }
};


const verifyEmail = async (req, res) => {
  try {
    const { Pin, PinCode, userId } = req.body;
    if (Pin == PinCode) {
      const user = await User.findByIdAndUpdate(
        userId,
        { flag: true },
        { new: true }
      );
      const updatedUser = await user.save();
      const token = jwt.sign(
        {
          id: updatedUser._id,
          userName: updatedUser.userName,
          role: updatedUser.role,
        },
        SECRETKEY,
        { expiresIn: "24h" }
      );
      return res.json({ updatedUser, token });
    } else {
      return res.status(500).json({ error: "Incorrect Pin Code" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to send the PIN code" });
  }
};

const newUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email: email });
  if (user.length != 0) {
    if(user[0].flag){
    // password check
    const validpassword = await bcrypt.compare(password, user[0].password);
    if (!validpassword) {
      return res.json({ error: "incorrect password" });
    }
    if (validpassword) {
      const token = jwt.sign(
        { id: user[0]._id, userName: user[0].userName, role: user[0].role },
        SECRETKEY,
        { expiresIn: "24h" }
      );
      const user0 = user[0];
      res.json({ token, user0 });
    }
  }else{



    // Send the PIN code to the user's email
    const mailOptions = {
      from: NODEMAILER_USER,
      to: email,
      subject: "Password Reset PIN Code",
      text: `Your PIN code for password reset is: ${user[0].pinCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to send the PIN code" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ message: "PIN code sent to email" });
      }
    });


    res.json({ error: "Check your pin code" });
  }
  } else {
   return res.json({ error: "no user found check your email" });
  }
};


const ResendPinCode = async (req, res) => {

  const { email } = req.body;
  const user = await User.find({ email: email });

const mailOptions = {
  from: NODEMAILER_USER,
  to: email,
  subject: "Password Reset PIN Code",
  text: `Your PIN code for password reset is: ${user[0].pinCode}`,
};
console.log(user[0].pinCode)
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to send the PIN code" });
  } else {
    console.log("Email sent: " + info.response);
    return res.json({ message: "PIN code sent to email" });
  }
});


res.json({ error: "Check your pin code" });
};


const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  res.status(204).json(User);
};

const updateUser = async (req, res) => {
  const image = req.file.path;
  const { userName } = req.body;
  const userId = req.params.id;
  const user = await User.findByIdAndUpdate(
    userId,
    { userName: userName, img: image },
    { new: true }
  );
  const updatedUser = await user.save();
  res.json(updatedUser);
};

const testPost = async (req, res) => {
  res.json({ user: "testPost" });
};
const testGet = async (req, res) => {
  res.json({ user: "testGet" });
};



module.exports = {
  allUsers,
  newUser,
  oneUser,
  deleteUser,
  newUserLogin,
  allProviders,
  allAdmins,
  userData,
  updateUser,
  testGet,
  testPost,
  verifyEmail,
  verifyOldEmail,
  ResendPinCode,
};
