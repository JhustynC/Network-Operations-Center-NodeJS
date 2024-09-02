import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async conecct(options: ConnectionOptions): Promise<boolean> {
    // Implementar la conexión con MongoDB
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, { dbName: dbName });
      console.log("¡Connected to MongoDB!");
    } catch (err) {
      console.log("Mongo database error");
      throw err;
    }

    return true; // Simulación de conexión exitosa
  }
}
