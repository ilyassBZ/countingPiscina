import Piscina from "piscina";
import chunk from "lodash";
import { arr } from "./arr.js";

// import count from "./worker.js";

// function run() {
//   console.time("count");
//   const totalCounts = count(arr);
//   console.log("Total counts:", totalCounts);
//
//   console.timeEnd("count");
// }
//
// run();

const piscina = new Piscina({
  filename: "./worker.js",
  maxThreads: 100,
});

const chunkSize = Math.ceil(arr.length / 4);
const chunks = chunk.chunk(arr, chunkSize);

async function run() {
  console.time("count");
  const promises = chunks.map((chunk) => piscina.run(chunk));
  const results = await Promise.all(promises);

  const totalCount = results.reduce(
    (sum, count) => ({
      active: sum.active + count.active,
      valid: sum.valid + count.valid,
      disabled: sum.disabled + count.disabled,
    }),
    { active: 0, valid: 0, disabled: 0 },
  );
  console.log(`Total counts:`, totalCount);
  console.timeEnd("count");
}

run();
