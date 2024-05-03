const mongoose=require("mongoose");
const URI=process.env.MONGODB_URI;

const connectDb=async()=>{
    try {
        await mongoose.connect(URI);
        console.log("connected successfully to database.");
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
};

module.exports = connectDb;