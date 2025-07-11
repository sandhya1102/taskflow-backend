import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import cookieParser from "cookie-parser"

dotenv.config();
connectDB();

const app = express();

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: ["https://taskflow-frontend-pvrs.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};


app.use(cors(corsOption))

app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT);
