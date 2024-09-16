import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
  main();
  console.log();
})();

async function main() {
  try {
    await MongoDatabase.conecct({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  } catch (err) {
    console.log(err);
  }

  // console.log(envs);

  // const prisma = new PrismaClient();
  // const newlog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "Test message from Prisma Client",
  //     origin: "app.ts",
  //     createAt: new Date(),
  //   },
  // });

  // console.log(newlog);

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'HIGH',
  //   },
  // });

  // console.log(logs);

  //Crear una coleccion =  tabla en SQL
  //Documento = Regsitro de la tabla
  // const newLog = await LogModel.create({
  //   level: LogSeverityLevel.low,
  //   message: "Test message from Node Server",
  //   origin: "app.ts",
  //   createAt: new Date(),
  // });

  // await newLog.save();

  // console.log(newLog);

  // const logs = await LogModel.find();
  // const logs = await LogModel.find({ level: LogSeverityLevel.low});
  // console.log(logs);

  Server.start();
}
