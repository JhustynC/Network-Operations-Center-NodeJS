import { envs } from "./envs.plugin";

const testEnvs = {
  MAILER_EMAIL: "carvachez999@gmail.com",
  MAILER_SECRET_KEY: "viumquukffdgrajq",
  MAILER_SERVICE: "gmail",
  MONGO_DB_NAME: "NOC-TEST",
  MONGO_PASS: "123456789",
  MONGO_URL: "mongodb://jhustyn:123456@localhost:27017/",
  MONGO_USER: "jhusty-test",
  PORT: 4000,
  PROD: false,
};

describe("envs.plugin.ts", () => {
  test("should return envs options", async () => {
    expect(envs).toEqual(testEnvs);
  });

  test("Shuld return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";
    try {
      await import("./envs.plugin");
      console.log(process.env.PORT);
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain(`"PORT" should be a valid integer`);
    }
  });
});
