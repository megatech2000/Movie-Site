import mongoose from "mongoose";

export connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
      } catch (error) {
        handleError(error);
      }
}