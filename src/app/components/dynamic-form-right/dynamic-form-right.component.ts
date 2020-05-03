import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DynamicFormFields } from './../../interfaces/dynamic-form';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from './../../services/dynamic-form.service';

@Component({
  selector: 'app-dynamic-form-right',
  templateUrl: './dynamic-form-right.component.html',
  styleUrls: ['./dynamic-form-right.component.css']
})
export class DynamicFormRightComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  @Input() dialog: boolean;
  fieldData: DynamicFormFields;
  constructor(private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.fieldData = this.fields;

    if (this.fieldData.colspan === undefined) {

      if (this.dialog === true) {
        if (this.fieldData.controlType === 'json' || this.fieldData.controlType === 'jsonarray') {
          this.fieldData.colspan = 12;
        }

      } else {
        if (this.fieldData.controlType === 'json' || this.fieldData.controlType === 'jsonarray') {
          this.fieldData.colspan = 12;
        } else {
          this.fieldData.colspan = 3;
        }
      }
    }



    // console.log('this.fieldData : panel', this.fieldData);
  }

}
