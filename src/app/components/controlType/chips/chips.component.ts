import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { FormGroup, ControlContainer } from '@angular/forms';
import { DynamicFormService } from './../../../services/dynamic-form.service';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  // form: FormGroup;
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
  }

  ngOnChanges() {
    this.fieldData = this.fields;
    // console.log('this.fieldData : panel', this.fieldData);
  }

  onBlur(e) {
    let tmp = []
    if (this.fieldData.hasOwnProperty('type')) {
      if (this.fieldData.type === 'number') {
        for (const i of this.form.get(this.fieldData.key).value) {
          if (isNaN(i)) {
            tmp.push(i);
          } else {
            tmp.push(Number(i));
          }
        }
      }
    }

    this.form.get(this.fieldData.key).patchValue(tmp);

    console.log(this.form.get(this.fieldData.key).value);
  }
}
