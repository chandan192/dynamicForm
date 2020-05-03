import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { FormGroup, ControlContainer } from '@angular/forms';
import { DynamicFormService } from './../../../services/dynamic-form.service';

@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css']
})
export class FieldsetComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  fieldData: DynamicFormFields;
  colspan: string;
  constructor(private controlContainer: ControlContainer, private _colspan: DynamicFormService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.fieldData = this.fields;
  }

}
