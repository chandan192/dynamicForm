import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routes/dynamicForm.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from './components/controlType/input/input.component';
import { ToggleComponent } from './components/controlType/toggle/toggle.component';
import { ChipsComponent } from './components/controlType/chips/chips.component';
import { MultiSelectComponent } from './components/controlType/multi-select/multi-select.component';
import { CalendarComponent } from './components/controlType/calendar/calendar.component';
import { PanelComponent } from './components/controlType/panel/panel.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonComponent } from './components/controlType/json/json.component';
import { JsonArrayComponent } from './components/controlType/json-array/json-array.component';
import { SelectComponent } from './components/controlType/select/select.component';
import { SliderComponent } from './components/controlType/slider/slider.component';
import { DynamicFormRightComponent } from './components/dynamic-form-right/dynamic-form-right.component';
import { CustomComponent } from './components/controlType/custom/custom.component';
import { FieldsetModule } from 'primeng/fieldset';
// primeng
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';

// material
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FieldsetComponent } from './components/controlType/fieldset/fieldset.component';
import { NumbersOnlyDirective } from './components/controlType/input/numbers-only.directive';
import { MatBadgeModule } from '@angular/material/badge';
import { BackupComponent } from './backup/backup.component';
import { MultiComponent } from './components/multi/multi.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ToggleComponent,
    ChipsComponent,
    MultiSelectComponent,
    CalendarComponent,
    PanelComponent,
    DynamicFormComponent,
    JsonComponent,
    JsonArrayComponent,
    SelectComponent,
    SliderComponent,
    DynamicFormRightComponent,
    CustomComponent,
    FieldsetComponent,
    NumbersOnlyDirective,
    BackupComponent,
    MultiComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // primeng
    PanelModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    KeyFilterModule,
    MultiSelectModule,
    SliderModule,
    InputSwitchModule,
    TabViewModule,
    AccordionModule,
    DialogModule,
    TableModule,
    FieldsetModule,
    MessagesModule,
    ToolbarModule,
    OverlayPanelModule,
    // material
    MatSliderModule,
    MatSnackBarModule,
    TooltipModule,
    MatBadgeModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
