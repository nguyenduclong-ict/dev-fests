import { debounce, nowTime } from '../dist/extra';

const f = debounce((key) => {
  console.log('debounce', key, nowTime());
}, 3000);

function main() {
  console.log('main started', nowTime());
  f();
  f(10, { key: 10 });
}

main();
