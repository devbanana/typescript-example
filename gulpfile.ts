// noinspection JSUnusedGlobalSymbols

import { dest, series, src, watch } from 'gulp';
import * as ts from 'gulp-typescript';
import * as del from 'del';
import * as zip from 'gulp-zip';

const project = ts.createProject('tsconfig.json');

export function compile(): NodeJS.ReadWriteStream {
  return project.src().pipe(project()).pipe(dest('build'));
}

export function monitor(): NodeJS.EventEmitter {
  return watch('src/**/*.ts', compile);
}

export function clean(): Promise<void> {
  return del(['build/**/*.js', 'build/**/*.d.ts', 'dist/*.zip']).then(paths => {
    paths.forEach(path => console.log(`Deleted ${path}`));
  });
}

function createZip(): NodeJS.ReadWriteStream {
  return src(['package*.json', 'build/**/*.js', 'build/**/*.d.ts'], {
    base: '.',
  })
    .pipe(zip('typescript-example.zip'))
    .pipe(dest('dist'));
}

export default series(compile, createZip);
