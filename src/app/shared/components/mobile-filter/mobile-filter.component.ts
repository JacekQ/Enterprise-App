import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-filter',
  templateUrl: './mobile-filter.component.html',
  styleUrls: ['./mobile-filter.component.scss']
})
export class MobileFilterComponent {
  @Input() formInvalid: boolean;
  @Output() submit: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.submit.emit();
  }
}
