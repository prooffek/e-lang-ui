import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, FeaturesRoutingModule, SharedModule],
})
export class FeaturesModule {}
