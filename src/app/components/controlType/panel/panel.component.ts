import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { DynamicFormService } from './../../../services/dynamic-form.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, OnChanges {
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
