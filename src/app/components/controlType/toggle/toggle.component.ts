import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { FormGroup, ControlContainer, FormArray } from '@angular/forms';
import { DynamicFormService } from './../../../services/dynamic-form.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  fieldData: DynamicFormFields;
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

    // console.log('toggle : ', this.fieldData.key, this.form.get(this.fieldData.key).value);

    if (this.form.get(this.fieldData.key).value === true || this.form.get(this.fieldData.key).value != 0) {
      this.form.get(this.fieldData.key).patchValue(true);
      this.onChange(true);
    } else {
      this.form.get(this.fieldData.key).patchValue(false);
      this.onChange(false);
    }
  }

  ngOnChanges() {
    this.fieldData = this.fields;
  }

  onChange(e) {

    if (this.fieldData.hasOwnProperty('dependency')) {
      for (const i of this.fieldData.dependency) {
        // console.log('e :', e, i.key);

        if (e) {
          this.form.get(i.key).enable();
        } else {
          this.form.get(i.key).disable();
        }
      }
    }
  }
}
