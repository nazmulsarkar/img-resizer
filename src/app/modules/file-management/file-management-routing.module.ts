import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileFormComponent } from './components/file-form/file-form.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { FileManagementComponent } from './components/file-management/file-management.component';

const routes: Routes = [
  {
    path: '',
    component: FileManagementComponent,
    children: [
      {
        path: 'list',
        component: FileListComponent,
      },
      {
        path: 'upload',
        component: FileFormComponent,
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileManagementRoutingModule { }
