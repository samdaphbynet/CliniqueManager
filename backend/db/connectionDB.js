import mongoose from 'mongoose';

export const connectionDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "CLINQUEMANAGER"
    }).then(() => {
        console.log("Database connected successfully")
    }).catch(err => console.error(err));
}