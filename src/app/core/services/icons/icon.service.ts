import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private readonly _matIconRegistry = inject(MatIconRegistry);
  private readonly _domSanitizer = inject(DomSanitizer);
  private readonly _basePath: string = '../../../assets/icons/';

  registerIcon(fileName: string, extension?: string) {
    this._matIconRegistry.addSvgIcon(
      fileName,
      this._domSanitizer.bypassSecurityTrustResourceUrl(`${this._basePath}${fileName}.${extension ?? 'svg'}`),
    );
  }
}
