import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})

export class CustomComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormFields;

  // form: FormGroup;
  fieldData: DynamicFormFields;
  colspan: string;
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.fieldData.hasOwnProperty('route')) {
      this.router.navigate([this.fieldData['route']], { skipLocationChange: true });
    }
  }

  ngOnChanges() {
    this.fieldData = this.fields;
    // console.log('this.fieldData : panel', this.fieldData);
  }

}
