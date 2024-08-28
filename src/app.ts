import { envs } from "./config/plugins/envs.plugin";
import { Sever } from "./presentation/server";
// export {};

(async () => {
  main();
  console.log();
})();

function main() {
  Sever.start();
 console.log(envs);
}
