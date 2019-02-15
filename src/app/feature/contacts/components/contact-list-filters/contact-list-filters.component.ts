import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-list-filters',
  templateUrl: './contact-list-filters.component.html',
  styleUrls: ['./contact-list-filters.component.scss'],
})
export class ContactListFiltersComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() filterOptions: any;
  @Input() mode = 'desktop';

  constructor() { }

  ngOnInit() { }
}
