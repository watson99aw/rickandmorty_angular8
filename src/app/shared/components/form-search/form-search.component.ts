import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  template: `
    <input
      #inputSearch
      autoFocus
      type="text"
      class="form-control-lg"
      placeholder="Search..."
      (keyup)="onSearch(inputSearch.value)"
    />
  `,
  styles: ['input{ width:100%; }'],
})
export class FormSearchComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSearch(value: string): void {
    this.router.navigate(['/character-list'],{
      queryParams: {
       q: value
      },
    })
  }
}
