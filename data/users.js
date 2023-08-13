import bcrypt from "bcryptjs";

const Users = [
  {
    name: "Arooj",
    email: "testuser@guddge.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Admin",
  },
  {
    name: "malaika",
    email: "malaikaashiq80@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Contractor",
  },
  // {
  //   name: "Jane",
  //   email: "jane@gmail.com",
  //   password: bcrypt.hashSync("123456", 10),
  //   role: "Admin",
  // },
  // {
  //   name: "Client",
  //   email: "client@gmail.com",
  //   password: bcrypt.hashSync("123456", 10),
  //   role: "Client",
  //   clientRate: "50",
  // },
  // {
  //   name: "Arooj",
  //   email: "arooj@gmail.com",
  //   password: bcrypt.hashSync("123456", 10),
  //   role: "Contractor",
  //   clientRate: "60",
  // },
];

export default Users;
