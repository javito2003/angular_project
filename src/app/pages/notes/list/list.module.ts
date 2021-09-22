import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteModule } from 'src/app/shared/components/list/list.module';
import { NoteComponent } from 'src/app/shared/components/list/list.component';


@NgModule({
  declarations: [
    ListComponent, NoteComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    ReactiveFormsModule,
    NoteModule
  ]
})
export class ListModule { }
