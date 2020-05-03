import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { DynamicFormFields } from './../../../interfaces/dynamic-form';
import { FormGroup, FormControl, FormArray, Validators, ValidatorFn, ControlContainer } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DynamicFormService } from './../../../services/dynamic-form.service';

@Component({
  selector: 'app-json-array',
  templateUrl: './json-array.component.html',
  styleUrls: ['./json-array.component.css']
})
export class JsonArrayComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormFields;
  @Input() form: FormGroup;
  fieldData: DynamicFormFields;
  display: boolean;
  cols: { field: any; header: string; }[] = [];
  tableData: any[] = [];
  control: FormArray;
  selectedRow: any = {};
  wasPreviuosTableDataEmpty: boolean;
  editDisplay = false;
  selectedRecord: any = {};
  colspan: string;
  isDialog = true;
  emptyDialog: any = {};
  controlIndex = 0;
  row = [];


  // tslint:disable-next-line: max-line-length
  constructor(private controlContainer: ControlContainer, private _snackBar: MatSnackBar, private dynamicFormService: DynamicFormService) { }

  ngOnInit() {

    // console.log(this.fieldData.key, this.form.get(this.fieldData.key)['controls']);

    this.dynamicFormService.getColSpan(this.fieldData.colspan).subscribe(result => {
      this.colspan = result;
    });

    for (const i of this.fieldData.fields) {
      this.cols.push({ field: i.key, header: i.label });
    }

    this.control = this.form.controls[this.fieldData.key] as FormArray;
    this.tableData = this.control.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fieldData = this.fields;
    this.form.get(this.fieldData.key).patchValue(this.fieldData.value);
    // console.log('this.fieldData - fieldset', this.fieldData);
  }



  deleteControl() {

    if (this.selectedRow.index === undefined) {
      this._snackBar.open('Please Select Row to Delete', 'OK', {
        duration: 3000
      });
      return;
    }

    this.control.removeAt(this.selectedRow.index);
    this.tableData = this.control.value;
    this.selectedRow = {};
    this.row = null;


  }

  editControl() {
    if (this.selectedRow.index === undefined) {
      this._snackBar.open('Please Select Row to Update', 'OK', {
        duration: 3000
      });
      return;
    }
    this.editDisplay = true;
    this.display = true;
    this.controlIndex = this.selectedRow.index;

  }

  updateControl() {
    this.display = false;
    this.editDisplay = false;
    this.selectedRow = {};
    this.row = null;
    this.tableData = this.control.value;
  }

  resetUpdate() {
    this.display = false;
    this.editDisplay = false;
    this.tableData[this.selectedRow.index] = this.row;
    this.selectedRow = {};
    this.row = null;
  }

  onRowSelect(event) {
    console.log(event);
    this.selectedRow = event;
    console.log('row', this.row);
  }

  onRowUnselect(event) {
    console.log(event);
    this.selectedRow = {};
    console.log('row', this.row);
  }


  showDialog() {
    this.display = true;
    this.control.push(this.toFormGroup(this.fieldData.fields));
    this.controlIndex = this.control.length - 1;
  }

  addControl() {
    this.display = false;
    this.tableData = this.control.value;
  }

  resetControl() {
    this.display = false;
    this.control.removeAt(this.control.length - 1);
  }


  toFormGroup(fields: DynamicFormFields[]): FormGroup {
    const formControlMap = {};
    fields.forEach(field => {

      formControlMap[field.key] = new FormControl(field.value, this.generateValidator(field.validators));

    });
    return new FormGroup(formControlMap);

  }

  generateValidator(rule: any): ValidatorFn[] {
    const varray: ValidatorFn[] = [];
    // tslint:disable-next-line: forin
    for (const r in rule) {
      if (r === 'min') {
        varray.push(Validators.min(rule[r]));
      }
      if (r === 'max') {
        varray.push(Validators.max(rule[r]));
      }
      if (r === 'required') {
        varray.push(Validators.required);
      }
      if (r === 'requiredTrue') {
        varray.push(Validators.requiredTrue);
      }
      if (r === 'email') {
        varray.push(Validators.email);
      }
      if (r === 'minLength') {
        varray.push(Validators.minLength(rule[r]));
      }
      if (r === 'maxLength') {
        varray.push(Validators.maxLength(rule[r]));
      }
      if (r === 'pattern') {
        varray.push(Validators.pattern(rule[r]));
      }
    }
    return varray;
  }





}
