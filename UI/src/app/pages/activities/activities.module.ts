import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';

import { ActivitiesComponent } from './activities.component';

import { SharedModule } from '../../shared/shared.module';
import { CreateActivitiesComponent } from './create-activities/create-activities.component';

@NgModule({
  declarations: [ActivitiesComponent, CreateActivitiesComponent],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    SharedModule
  ]
})
export class ActivitiesModule { }
