import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list-filters',
  templateUrl: './user-list-filters.component.html',
  styleUrls: ['./user-list-filters.component.scss'],
})
export class UserListFiltersComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() filterOptions: any;
  @Input() mode = 'desktop';

  constructor() { }

  ngOnInit() { }
}
