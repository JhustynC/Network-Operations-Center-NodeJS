import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async conecct(options: ConnectionOptions): Promise<mongoose.Mongoose> {
    // Implementar la conexión con MongoDB
    const { mongoUrl, dbName } = options;
    try {
      const mongodb = await mongoose.connect(mongoUrl, { dbName: dbName });
      // console.log("¡Connected to MongoDB!");
      return mongodb;
    } catch (err) {
      // console.log("Mongo conection database error");
      throw "Mongo conection database error";
    }
  }
}
