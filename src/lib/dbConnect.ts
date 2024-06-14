import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};
//here empty array doesn't give error as the isConnected is optional

async function dbConnect(): Promise<void> {
  //in there :promise<void> is the type of the return value
  if (connection.isConnected) {
    console.log("Already connected to the data base");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {}); //Todo read mongoose and fill the curly brackets 9:40 3rd video

    connection.isConnected = db.connections[0].readyState;
    //TODO see db consoles
    console.log("db connected successfully");
  } catch (error) {
    console.log("data connection failed", error);
    process.exit();
  }
}

export default dbConnect;


//re_JpeppxuR_GmeGmYEmuQETi1dKDfUJFzTq resend email api key 