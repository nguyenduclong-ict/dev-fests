#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const [node, root, command, ...args] = process.argv;
console.log(node, root, command, args);
switch (command) {
  case 'new':
    newProject(args);
    break;
  default:
    break;
}

function newProject(args = []) {
  const projectName = args[0]; // project name

  if (!projectName) {
    console.error('Missing project name');
    return;
  }

  // config
  fs.mkdirSync('config');
  fs.mkdirSync('routes');
  fs.mkdirSync('middlewares');
  fs.mkdirSync('services');
  fs.mkdirSync('utils');

  // package.json
  fs.writeFileSync(
    'package.json',
    JSON.stringify(
      {
        name: projectName,
        version: '0.0.1',
        description: 'Simple express with typescript and fests library',
        main: 'build/index.js',
        scripts: {
          dev: 'tsc -w && nodemon build/index.js',
          build: 'tsc',
          start: 'node build/index.js',
        },
        dependencies: {
          fesjs: 'https://github.com/nguyenduclong-ict/fesjs.git',
        },
        devDependencies: {
          'module-alias': '^2.2.2',
          '@types/express': '^4.17.6',
          tslint: '^6.1.1',
          typescript: '^3.8.3',
        },
      },
      null,
      2
    )
  );

  // tsconfig.json
  fs.writeFileSync(
    'tsconfig.json',
    JSON.stringify(
      {
        compilerOptions: {
          baseUrl: '.',
          module: 'commonjs',
          esModuleInterop: true,
          moduleResolution: 'node',
          target: 'es6',
          outDir: 'dist',
          paths: {
            '@/*': ['src/*'],
          },
        },
        include: ['./**/*'],
        exclude: ['build', 'node_modules/*/node_modules'],
        lib: ['es2015'],
      },
      null,
      2
    )
  );

  // tsconfig.json
  fs.writeFileSync(
    'tslint.json',
    JSON.stringify(
      {
        defaultSeverity: 'error',
        extends: ['tslint:recommended'],
        jsRules: {},
        rules: {
          'no-console': false,
        },
        rulesDirectory: [],
      },
      null,
      2
    )
  );
}
