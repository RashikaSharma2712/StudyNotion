const express = require("express");
const app = express();
const userRoutes = require("./Route/User");
const profileRoutes = require("./Route/Profile");
const courseRoutes = require("./Route/Course");
const paymentRoutes = require("./Route/Payment");
const contactUsRoute = require("./Route/Contact");
const database = require("./Configuration/Database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./Configuration/Cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

const PORT = process.env.PORT || 4000;

dotenv.config();

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
		// methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		// allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, "tmp");
if (!require("fs").existsSync(tempDir)) {
	require("fs").mkdirSync(tempDir, { recursive: true });
}

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: tempDir,
		limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
	})
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Welcome To StudyNotion",
	});
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "Something went wrong!",
		error: err.message,
	});
});

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});


