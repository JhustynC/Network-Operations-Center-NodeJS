import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Sever } from "./presentation/server";
import { LogSeverityLevel } from "./domain/entities/log.entity";
import { LogRepositoryImpl } from "./infrastructure/repositories/log.repository.imp";
import { PrismaClient } from "@prisma/client";
// export {};

(async () => {
  main();
  console.log();
})();

async function main() {
  await MongoDatabase.conecct({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

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

  Sever.start();
}
