import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from './../../../services/dynamic-form.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  // form: FormGroup;
  fieldData: DynamicFormFields;
  colspan: string;
  constructor(private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    this.dynamicFormService.getColSpan(this.fieldData.colspan).subscribe(result => {
      this.colspan = result;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fieldData = this.fields;
    // console.log('this.fieldData - fieldset', this.fieldData);
  }

}
