import { Component, OnInit } from '@angular/core';
import * as FormSchema from './data/dynamicForm.json';
import { DynamicForm } from './interfaces/dynamic-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dataDrivenForm';
  readOnly = false;
  sidePanelPosition = 'left';
  buttonStyle = {
    width: '61px',
    height: '55px',
    'border-radius': '50%',
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    cursor: 'pointer',
    'font-size': '14px',
    'box-shadow': '0px 2px 5px #666'
  };
  buttonClass = 'red';
  jsonFile: DynamicForm[];
  metadata = {
    Pages: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' }
    ]

  };
  response: any;
  Obj: any;

  constructor(private http: HttpClient) { }

  getResult(output) {
    // this.Obj = {};
    // console.log('output : ', output);

    // // tslint:disable-next-line: forin
    // for (const i in output) {
    //   this.getKeyValues(output[i]);
    // }

    // // Handling for Duplicate keys
    // // It may happen when are recursively creating same keys for multiple values

    // // tslint:disable-next-line: forin
    // for (const i in this.Obj) {
    //   const tmp = [];
    //   // tslint:disable-next-line: forin
    //   for (const j in this.Obj) {
    //     if (i.split('$')[0] === j.split('$')[0]) {

    //       // Only those keyword whose value is not empty should be considered
    //       if (this.Obj[j] !== '') {
    //         tmp.push(this.Obj[j]);
    //       }
    //       delete this.Obj[j];
    //     }
    //   }

    //   if (tmp.length) {
    //     this.Obj[i.split('$')[0]] = tmp.join(' ');

    //     // remove those keywords whose value is not changed
    //     if (this.response[i.split('$')[0]] === this.Obj[i.split('$')[0]]) {
    //       delete this.Obj[i.split('$')[0]];
    //     }
    //   }
    // }


    // console.log(this.Obj);


    // const data = 'data:' + JSON.stringify(this.Obj);
    // const url = 'http://10.20.0.53:8029/netvision/rest/webapi/postconfigui?access_token=563e412ab7f5a282c15ae5de1732bfd1';
    // this.http.post(url, data, { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) }).subscribe(res => console.log('responseeee', res));



  }

  getKeyValues(data: any) {

    if (data.hasOwnProperty('General Setting')) {
      this.getKeyValues(data['General Setting']);

    }

    if (data.hasOwnProperty('Advanced Setting')) {
      this.getKeyValues(data['Advanced Setting']);

    }
    // console.log('data :', data);
    // tslint:disable-next-line: forin
    for (const i in data) {

      if (data[i] === true) {
        this.Obj[i] = 1;

      } else if (data[i] === false) {
        this.Obj[i] = 0;

      } else if (typeof (data[i]) === 'object') {
        this.getKeyValues(data[i]);

      } else {
        this.Obj[i] = data[i];
      }

    }


  }

  ngOnInit() {
    this.jsonFile = FormSchema['default'];
    // const jsonTmp = FormSchema['default'];

    // const url = 'http://10.20.0.53:8029/netvision/rest/webapi/getconfigui?sid=123e3e2323&access_token=563e412ab7f5a282c15ae5de1732bfd1';
    // this.http.get(url).subscribe(response => {

    //   console.log('Response : ', response);

    //   this.response = response;
    //   for (const i of jsonTmp) {
    //     this.setJSONFile(i.fields);
    //   }
    //   console.log(jsonTmp);
    //   this.jsonFile = jsonTmp;
    // },
    //   error => {
    //     console.log(error);
    //     alert('Oops ... ' + error.status + ' (' + error.statusText + ')');
    //   }
    // );

  }

  setJSONFile(fields: any[]) {

    // tslint:disable-next-line: forin
    for (const i in fields) {

      if (fields[i].hasOwnProperty('formName')) {
        this.setJSONFile(fields[i].fields);
      } else if (fields[i].hasOwnProperty('subFormName')) {
        this.setJSONFile(fields[i].fields);

      } else {
        // console.log(fields[i]);
        if (this.response.hasOwnProperty(fields[i].key.split('$')[0])) {
          if (!fields[i].hasOwnProperty('value')) {
            this.setJSONFile(fields[i].fields);

          } else {

            const tmp = this.response[(fields[i].key).split('$')[0]];
            const tmpArr = tmp.split(' ');
            const val = tmpArr[fields[i].key.split('$')[1]];
            fields[i].value = (val !== undefined ? val : '');

            // console.log('tmpArr : ', tmpArr[fields[i].key.split('$')[1]], ' tmp ', tmp);
            console.log(i, ' ', fields[i].key, ' ', fields[i].value);

            // console.log(fields[i].key, fields[i].value);
          }
        }
      }


    }

  }
}
