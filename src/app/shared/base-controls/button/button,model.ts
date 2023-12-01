import { ThemePalette } from '@angular/material/core';

export interface ButtonModel {
  label: string;
  onClick: any;
  width?: string;
  height?: string;
  color?: ThemePalette;
  isDisabled?: boolean;
  iconFile?: string;
}
