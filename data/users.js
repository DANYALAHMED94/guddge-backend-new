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
  {
    name: "Client",
    email: "client@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Client",
    clientRate: "50",
  },
  {
    name: "Arooj",
    email: "arooj@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Contractor",
    clientRate: "60",
  },
];

export default Users;
