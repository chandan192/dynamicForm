import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { BackupComponent } from '../backup/backup.component';


const routes: Routes = [
  { path: '', component: DynamicFormComponent },
  { path: 'dynamicForm', component: DynamicFormComponent },
  { path: 'backup', component: BackupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
