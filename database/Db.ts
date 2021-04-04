import mongoose from 'mongoose';
import { config } from "dotenv";

config();

const MongoURL: string = process.env.MONGODB_URL as string;

export const db = (async () => {
      try {
        await mongoose.connect(MongoURL, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true
      })
        console.log('MongoDB connecté');
      } catch (error) {
        console.log('Erreur lors de la connexion à MongoDB : ' + error);
      }
    })();