import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { FileForm } from '../../forms/file.form';
import { FileModel } from '../../models/file.model';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss'],
})
export class FileFormComponent implements OnInit, OnDestroy {
  loading = new BehaviorSubject<boolean>(false);
  filesToUpload!: File[];
  uploadForm = this.formBuilder.group(FileForm);
  private id = '';
  private sub: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: FileService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFilesChange = (event: any): void => {
    this.filesToUpload = event.target.files;
  };

  startUpload() {
    this.loading.next(true);
    const formData = new FormData();
    for (let i = 0; i < this.filesToUpload.length; i++) {
      formData.append('files', this.filesToUpload[i]);
    }

    this.service
      .uploadFiles(formData)
      .subscribe((response: FileModel) => {
        console.log('response received is ', response);
        if (response && response.id) {
          this.snackBar.open('Files uploaded!', 'Close', { duration: 3000 });
        }

        this.loading.next(false);
      });
  }
}
