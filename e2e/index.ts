import { assignObject } from '../dist/extra';

function main() {
  const a = {
    info: {
      name: 'Long',
    },
    student: {
      id: '24260',
    },
  };
  const b = {
    info: {
      age: 24,
    },
    student: {
      classCode: '60PM1',
    },
  };

  assignObject(a, b);

  console.log(a);
}

main();
