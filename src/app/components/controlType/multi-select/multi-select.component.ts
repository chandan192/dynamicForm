import { Component, OnInit, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from './../../../services/dynamic-form.service';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})

export class MultiSelectComponent implements OnInit, OnChanges {
  @ViewChild('select', { static: false }) select: MultiSelect;
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  fieldData: DynamicFormFields;
  options: any[] = [];
  colspan: string;
  errorMsg: { min: string; max: string; required: string; email: string; pattern: string; };
  selectedItemsLabel = '{0} items selected';

  constructor(private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    this.dynamicFormService.getColSpan(this.fieldData.colspan).subscribe(result => {
      this.colspan = result;
    });

    this.dynamicFormService.getErrorMessage().subscribe(result => {
      this.errorMsg = result;
    });


    this.changeSelectLabel();


  }

  changeSelectLabel() {
    const val = this.form.get(this.fieldData.key).value;

    if (this.fieldData.hasOwnProperty('type') && this.fieldData['type'] === 'text') {
      if (this.fieldData.hasOwnProperty('delimiter')) {
        this.selectedItemsLabel = val === '' ? '' : val.split(this.fieldData['delimiter']).length + ' items selected';
      } else {
        this.selectedItemsLabel = val === '' ? '' : val.split(',').length + ' items selected';
      }
      console.log('select : ', this.selectedItemsLabel);

    }
  }


  ngOnChanges() {
    this.fieldData = this.fields;
    if (typeof (this.fieldData.options) === 'string') {
      this.dynamicFormService.getMetadata(this.fieldData.options).subscribe(arg => {
        this.fieldData.options = arg;
        this.options = arg;
      });

    } else {
      this.options = this.fieldData.options;
    }

  }

  onFocus() {

    const val = this.form.get(this.fieldData.key);

    // if the form value is in string
    // convert it to array
    if (typeof (val.value) === 'string') {
      // also check if the value is not fieldData.allvalue
      if ((this.fieldData.hasOwnProperty('allvalue'))) {
        if (val.value !== this.fieldData['allvalue']) {
          if (val.value === '') {
            val.patchValue([]);

          } else {
            if (this.fieldData.hasOwnProperty('delimiter')) {
              val.patchValue(val.value.split(this.fieldData['delimiter']));

            } else {
              val.patchValue(val.value.split(','));
            }
          }
        } else {
          //  if the value is allvalue , then array should contain all the values
          const tmpArr = [];
          for (const i of this.options) {
            tmpArr.push(i.value);
          }
          val.patchValue(tmpArr);
        }

      } else {
        // if allvalue isnot present, convert the string to array
        if (this.fieldData.hasOwnProperty('delimiter')) {
          val.patchValue(val.value.split(this.fieldData['delimiter']));

        } else {
          val.patchValue(val.value.split(','));
        }

      }
      // if the value is in array and its value is fieldData.allvalue
    } else if (Array.isArray(val.value)) {
      if (this.fieldData['allvalue'] !== undefined) {
        if (val.value[0] === this.fieldData['allvalue'][0]) {

          // if the value is allvalue then push all the values from the options to the form
          const tmp = [];
          for (const i of this.options) {
            tmp.push(i.value);
          }
          val.patchValue(tmp);
        }

      }
    }
  }

  onBlur() {
    const val = this.form.get(this.fieldData.key);
    // if type=text is present, convert the array to string
    if (this.fieldData.type === 'text') {

      // check if allvalue is present
      if (this.fieldData['allvalue'] !== undefined) {
        // if allvalue present, check if all value is selected
        // if all the values selected then insert allvalue
        if (this.options.length === val.value.length) {
          val.patchValue(this.fieldData['allvalue']);

          this.select.valuesAsString = this.options.length + ' items selected';

        }
        else {
          // if all the values not selected , convert the selected values to string
          // if delimiter is present join the string with the delimiter
          if (this.fieldData['delimiter'] !== undefined) {
            val.patchValue(val.value.join(this.fieldData['delimiter']));
            this.select.valuesAsString = val.value === '' ? '' : val.value.split(this.fieldData['delimiter']).length + ' items selected';

          } else {
            val.patchValue(val.value.join(','));
            this.select.valuesAsString = val.value === '' ? '' : val.value.split(',').length + ' items selected';

          }
        }
      } else {
        // if allvalue is not present, convert the values to string 
        // if delimiter is present join the string with the delimiter
        if (this.fieldData['delimiter'] !== undefined) {
          val.patchValue(val.value.join(this.fieldData['delimiter']));
          this.select.valuesAsString = val.value === '' ? '' : val.value.split(this.fieldData['delimiter']).length + ' items selected';

        } else {
          val.patchValue(val.value.join(','));
          this.select.valuesAsString = val.value === '' ? '' : val.value.split(',').length + ' items selected';

        }
      }

    }

    console.log(this.form.get(this.fieldData.key).value);

  }

  onChange(e) {

    this.selectedItemsLabel = '{0} items selected';
    this.select.valuesAsString = e.value.length;
  }

}
