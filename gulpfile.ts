// noinspection JSUnusedGlobalSymbols

import { dest } from 'gulp';
import * as ts from 'gulp-typescript';

const project = ts.createProject('tsconfig.json');

export function compile(): NodeJS.ReadWriteStream {
  return project.src().pipe(project()).pipe(dest('build'));
}
