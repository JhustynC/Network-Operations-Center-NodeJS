import { envs } from "./envs.plugin";

const testEnvs = {
  MAILER_EMAIL: "carvachez999@gmail.com",
  MAILER_SECRET_KEY: "viumquukffdgrajq",
  MAILER_SERVICE: "gmail",
  MONGO_DB_NAME: "NOC-TEST",
  MONGO_PASS: "123456789",
  MONGO_URL: "mongodb://carvajal:123456789@localhost:27019/",
  MONGO_USER: "carvajal",
  MONGO_PORT: 27019,
  PROD: false,
};

describe("envs.plugin.ts", () => {
  test("should return envs options", async () => {
    expect(envs).toEqual(testEnvs);
  });

  test("Shuld return error if not found env", async () => {
    jest.resetModules();
    process.env.MONGO_PORT = "ABC";
    try {
      await import("./envs.plugin");
      console.log(process.env.MONGO_PORT);
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain(`"MONGO_PORT" should be a valid integer`);
    }
  });
});
