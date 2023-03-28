import mongoose from "mongoose";
import app from "./app";
import env from "./utils/validateEnv";
import http from 'http';
import { init as initSocketIo } from './io';

const port = env.PORT || 4444;

const server = http.createServer(app);

// mongodb+srv://admin:<password>@version-1.pdb37bh.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    server.listen(port, () => {
      console.log(`Server running on port: ${port}`);
      initSocketIo(server);
    });
  })
  .catch(console.error);
