const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 30000,
		socketTimeoutMS: 45000,
		maxPoolSize: 10,
		retryWrites: true,
		retryReads: true,
		w: "majority"
	};

	// Retry connection logic
	const connectWithRetry = () => {
		mongoose
			.connect(process.env.DATABASE_URL, options)
			.then(() => {
				console.log("DB Connection Success");
				
				// Handle connection events
				mongoose.connection.on("error", (err) => {
					console.error("MongoDB connection error:", err);
					setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
				});

				mongoose.connection.on("disconnected", () => {
					console.log("MongoDB disconnected, attempting to reconnect...");
					setTimeout(connectWithRetry, 5000);
				});

				process.on("SIGINT", async () => {
					try {
						await mongoose.connection.close();
						console.log("MongoDB connection closed through app termination");
						process.exit(0);
					} catch (err) {
						console.error("Error while closing MongoDB connection:", err);
						process.exit(1);
					}
				});
			})
			.catch((err) => {
				console.error("DB Connection Failed:", err.message);
				// Retry connection after 5 seconds
				setTimeout(connectWithRetry, 5000);
			});
	};

	// Initial connection attempt
	connectWithRetry();
};
