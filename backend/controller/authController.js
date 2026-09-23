const UserModel = require("../model/UserModel");

const getAllUsers = async (req, res) => {
    const data = await UserModel.find()
    res.send(data)
};
const registration = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let image = "";
    if (req.file) {
      image = req.file.filename;
    }

    const existedUser = await UserModel.findOne({email: email})
    if(existedUser){
        res.status(409).json({
          success: false,
          message: "User already existed",
          email: existedUser.email
        })
        return
    }

    const users = new UserModel({
      username: username,
      email: email,
      password: password,
      image: image,
    });

    await users.save();

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: users
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userDelete = async (req, res) => {
  const id = req.params
  try {
    await UserModel.findByIdAndDelete(id.id)
    res.send("Delete hoice")
  } catch (error) {
    res.send("User can't deleted")
  }
  
};
const userUpdate = async (req, res) => {
  const id = req.params;
  const { username, email, password } = req.body;
  
  let updateData = { username, email, password };
  if (req.file) {
    updateData.image = req.file.filename;
  }
  
  try {
    await UserModel.findByIdAndUpdate(id.id, updateData);
    res.send("update hoice");
  } catch (error) {
    res.send("User can't updated");
  }
};

module.exports = { getAllUsers, registration, userDelete, userUpdate };
