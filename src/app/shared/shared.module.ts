import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IconComponent } from './base-controls/icon/icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, NgOptimizedImage],
  exports: [IconComponent],
})
export class SharedModule {}
