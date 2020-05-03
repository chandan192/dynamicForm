import { Component, OnInit, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { FormGroup, ControlContainer } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';
import { DynamicFormService } from './../../../services/dynamic-form.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  @ViewChild('slider', { static: false }) slider: MatSlider;
  // form: FormGroup;
  fieldData: DynamicFormFields;
  value: number;
  colspan: string;
  errorMsg: { // console.log(this.slider);
    min: string; max: string; required: string; email: string; pattern: string;
  };

  constructor(private controlContainer: ControlContainer, private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    this.dynamicFormService.getColSpan(this.fieldData.colspan).subscribe(result => {
      this.colspan = result;
    });

    this.dynamicFormService.getErrorMessage().subscribe(result => {
      this.errorMsg = result;
    });

    // console.log('slider : ', this.fieldData.key, this.form.get(this.fieldData.key).value)

  }

  ngAfterViewInit() {
    // console.log(this.slider);

  }


  ngOnChanges() {
    this.fieldData = this.fields;
    this.value = this.fieldData.value as number;
    // console.log('this.fieldData : panel', this.fieldData);
  }
}
