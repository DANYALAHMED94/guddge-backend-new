import bcrypt from "bcryptjs";

const Users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Admin",
  },
  {
    name: "Sami",
    email: "sami@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Admin",
  },
  {
    name: "Jane",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Admin",
  },
];

export default Users;
