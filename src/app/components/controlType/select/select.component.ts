import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { FormGroup, ControlContainer } from '@angular/forms';
import { DynamicFormService } from './../../../services/dynamic-form.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  // form: FormGroup;
  fieldData: DynamicFormFields;
  options: any[];
  colspan: string;
  errorMsg: { min: string; max: string; required: string; email: string; pattern: string; };

  constructor(private controlContainer: ControlContainer, private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    this.dynamicFormService.getColSpan(this.fieldData.colspan).subscribe(result => {
      this.colspan = result;
    });

    this.dynamicFormService.getErrorMessage().subscribe(result => {
      this.errorMsg = result;
    });

    this.enableDisableControl(this.fieldData.value);

  }

  enableDisableControl(val) {
    if (this.fieldData.hasOwnProperty('dependency')) {
      for (const i of this.fieldData.dependency) {
        if (i.value === val) {
          this.form.get(i.key).disable();
        } else {
          this.form.get(i.key).enable();
        }
      }
    }
  }

  ngOnChanges() {
    this.fieldData = this.fields;
    if (typeof (this.fieldData.options) === 'string') {
      this.dynamicFormService.getMetadata(this.fieldData.options).subscribe(metadata => {
        this.options = metadata;
      });
    } else {
      this.options = this.fieldData.options;
    }

  }

  onChange(e) {
    this.enableDisableControl(e);
  }

}
