import bcrypt from "bcryptjs";

const Users = [
  {
    name: "ruchis",
    email: "ruchis@guddge.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Super Admin",
  },
  {
    name: "testuser",
    email: "testuser@guddge.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Admin",
  },
];

export default Users;
