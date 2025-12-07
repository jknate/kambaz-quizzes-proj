import { v4 as uuidv4 } from "uuid";
import { User } from "../../models/User.js";

export default function UsersDao() {
  const createUser = async (user) => {
    const newUser = new User({ ...user, _id: uuidv4() });
    await newUser.save();
    return newUser;
  };

  const findAllUsers = async () => {
    return await User.find();
  };

  const findUserById = async (userId) => {
    return await User.findById(userId);
  };

  const findUserByUsername = async (username) => {
    return await User.findOne({ username });
  };

  const findUserByCredentials = async (username, password) => {
    return await User.findOne({ username, password });
  };

  const updateUser = async (userId, user) => {
    return await User.findByIdAndUpdate(userId, user, { new: true });
  };

  const deleteUser = async (userId) => {
    await User.findByIdAndDelete(userId);
    return true;
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
