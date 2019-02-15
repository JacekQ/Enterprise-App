import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  template: `
    <a mat-list-item
      [routerLinkActive]="rLink ? 'sidenav-menu-item-active' : ''"
      [routerLink]="rLink" (click)="navigate.emit()"
      #rla="routerLinkActive"
      [attr.tabindex]="rLink && rla.isActive ? -1 : 0"
    >
      <mat-icon mat-list-icon>{{ icon }}</mat-icon>
      <span mat-line><ng-content></ng-content></span>
      <span mat-line class="secondary">{{ hint }}</span>
    </a>
  `,
  styles: [
    `
    .secondary {
      color: rgba(0, 0, 0, 0.54);
    }
  `,
  ],
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() rLink: string | any[] = null;
  @Output() navigate = new EventEmitter();
}
