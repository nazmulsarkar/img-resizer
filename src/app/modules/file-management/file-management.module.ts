import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileListComponent } from './components/file-list/file-list.component';
import { FileManagementRoutingModule } from './file-management-routing.module';
import { FileService } from './services/file.service';
import { FileHttpService } from './services/file-http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FileManagementComponent } from './components/file-management/file-management.component';
import { FileFormComponent } from './components/file-form/file-form.component';

@NgModule({
  declarations: [FileListComponent, FileManagementComponent, FileFormComponent],
  imports: [
    CommonModule,
    FileManagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  providers: [FileService, FileHttpService],
  bootstrap: [FileManagementComponent],
})
export class FileManagementModule { }
