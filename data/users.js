import bcrypt from "bcryptjs";

const Users = [
  // {
  //   name: "ruchis",
  //   email: "ruchis@guddge.com",
  //   password: bcrypt.hashSync("123456", 10),
  //   role: "Super Admin",
  // },
  // {
  //   name: "testuser",
  //   email: "testuser@guddge.com",
  //   password: bcrypt.hashSync("123456", 10),
  //   role: "Admin",
  // },
  {
    name: "arooj",
    email: "ashiqarooj846@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Admin",
  },
  // {
  //   name: "fatime",
  //   email: "arooj.fatima.31324@gmail.com",
  //   password: bcrypt.hashSync("123456", 10),
  //   role: "Contractor",
  // },
];

export default Users;
