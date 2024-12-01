const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const companyRouter = require("./routes/companyRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const app = express();

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Parse cookies
app.use(cookieParser());

app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow only this origin
  methods: "GET,POST,PATCH,DELETE", // Specify the allowed HTTP methods
  credentials: true, // Allow cookies to be sent in requests
};
app.use(cors(corsOptions));

dotenv.config({ path: "./.env" });

const port = 4000 || process.env.PORT;
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => console.log(err));

app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/employee", employeeRouter);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
