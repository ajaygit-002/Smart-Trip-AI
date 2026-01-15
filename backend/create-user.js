// Script to create a new user
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");

const createUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb://localhost:27017/tourist-crowd-predictor"
    );
    console.log("Connected to MongoDB");

    // Get user input from command line arguments
    const args = process.argv.slice(2);

    if (args.length < 3) {
      console.log(
        "\n❌ Usage: node create-user.js <name> <email> <password> [preferences]"
      );
      console.log(
        'Example: node create-user.js "John Doe" john@example.com mypassword123 "museums,parks"'
      );
      console.log("\n");
      process.exit(1);
    }

    const [name, email, password, preferencesStr] = args;
    const preferences = preferencesStr
      ? preferencesStr.split(",").map((p) => p.trim())
      : [];

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`\n❌ User with email ${email} already exists!\n`);
      process.exit(1);
    }

    // Create new user
    const user = new User({
      name,
      email,
      passwordHash: password,
      preferences,
    });

    await user.save();

    console.log("\n✅ User created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Name:", user.name);
    console.log("Email:", user.email);
    console.log("Preferences:", user.preferences);
    console.log("Created At:", user.createdAt);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error creating user:", error.message);
    process.exit(1);
  }
};

createUser();
