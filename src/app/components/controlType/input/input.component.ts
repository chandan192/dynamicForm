import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { FormGroup, ControlContainer } from '@angular/forms';
import { DynamicFormService } from './../../../services/dynamic-form.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  fieldData: DynamicFormFields;
  colspan: string;
  errorMsg: { min: string; max: string; required: string; email: string; pattern: string; };
  constructor(private controlContainer: ControlContainer, private dynamicFormService: DynamicFormService) { }

  ngOnInit() {

    // console.log(this.form.controls[this.fieldData.key].validator(this.form.controls[this.fieldData.key]), this.fieldData.key)
    this.dynamicFormService.getColSpan(this.fieldData.colspan).subscribe(result => {
      this.colspan = result;
    });

    this.dynamicFormService.getErrorMessage().subscribe(result => {
      this.errorMsg = result;
    });



  }

  ok() {
    console.log(this.form.value);
  }

  ngOnChanges() {
    this.fieldData = this.fields;
  }

}
