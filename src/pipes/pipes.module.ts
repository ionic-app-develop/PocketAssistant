import { EllipsisPipe } from './ellipsis.pipe';
import { NgModule } from '@angular/core';
import {DateDiffPipe} from "./dateDiff.pipe";
import {ArrayPipe} from "./array.pipe";
@NgModule({
	declarations: [
    ArrayPipe,
    EllipsisPipe,
    DateDiffPipe
  ],
	imports: [],
	exports: [
    ArrayPipe,
    EllipsisPipe,
    DateDiffPipe
  ]
})
export class PipesModule {}
