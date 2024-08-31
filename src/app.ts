import { Sever } from "./presentation/server";
// export {};

(async () => {
  main();
  console.log();
})();

function main() {
  Sever.start();
}
