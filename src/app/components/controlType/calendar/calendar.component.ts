import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { FormGroup, ControlContainer } from '@angular/forms';
import { DynamicFormService } from './../../../services/dynamic-form.service';
// import { AppComponent } from './../../app.component';
// import * as moment from 'moment';
// import 'moment-timezone';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  fieldData: DynamicFormFields;
  maxDate: Date;
  colspan: string;
  errorMsg: { min: string; max: string; required: string; email: string; pattern: string; };

  constructor(private controlContainer: ControlContainer, private dynamicFormService: DynamicFormService) { }

  ngOnInit() {

    // const time = new Date().getTime();
    // const d = new Date(moment.tz(time, AppComponent.config.timeZone).format('MM/DD/YYYY HH:mm:ss'));
    // this.maxDate = new Date(d.toDateString() + ' 23:59:00');

    this.dynamicFormService.getColSpan(this.fieldData.colspan).subscribe(result => {
      this.colspan = result;
    });

    this.dynamicFormService.getErrorMessage().subscribe(result => {
      this.errorMsg = result;
    });
  }

  ngOnChanges() {
    this.fieldData = this.fields;
  }

}
