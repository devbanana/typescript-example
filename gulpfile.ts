// noinspection JSUnusedGlobalSymbols

import { dest, watch } from 'gulp';
import * as ts from 'gulp-typescript';
import * as del from 'del';

const project = ts.createProject('tsconfig.json');

export function compile(): NodeJS.ReadWriteStream {
  return project.src().pipe(project()).pipe(dest('build'));
}

export function monitor(): NodeJS.EventEmitter {
  return watch('src/**/*.ts', compile);
}

export function clean(): Promise<void> {
  return del(['build/**/*.js', 'build/**/*.d.ts']).then(paths => {
    paths.forEach(path => console.log(`Deleted ${path}`));
  });
}
