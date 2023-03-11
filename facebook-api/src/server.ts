import mongoose from "mongoose";
import app from "./app";
import env from "./utils/validateEnv";

const port = env.PORT;

// mongodb+srv://admin:<password>@version-1.pdb37bh.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch(console.error);
