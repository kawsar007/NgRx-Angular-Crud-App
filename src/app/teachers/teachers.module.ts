import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { teacherReducer } from './store/teachers.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TeachersEffects } from './store/teachers.effects';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    FormsModule,
    StoreModule.forFeature('myteachers', teacherReducer),
    EffectsModule.forFeature([TeachersEffects])
  ]
})
export class TeachersModule { }
