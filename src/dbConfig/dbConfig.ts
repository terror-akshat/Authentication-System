import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDb connected succesfully");
        });

        connection.on("error", (err) => {
            console.log(
                "Mongo connection error. please makes sure MOngoDb is runnig," + err
            );
        });
    } catch (error) {
        console.log("something went wrong");
        console.log(error);
    }
}
