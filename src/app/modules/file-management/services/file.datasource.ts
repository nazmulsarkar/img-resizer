import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { FileModel } from '../models/file.model';
import { IQueryParamsFile } from '../models/file.model';
import { FileService } from './file.service';

export class FileDataSource implements DataSource<FileModel> {
  private filesSubject = new BehaviorSubject<FileModel[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private fileService: FileService) { }

  loadFiles(filter: IQueryParamsFile) {
    this.loadingSubject.next(true);

    this.fileService
      .findFiles(filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((files) => this.filesSubject.next(files));
  }

  connect(collectionViewer: CollectionViewer): Observable<FileModel[]> {
    console.log('Connecting data source');
    return this.filesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.filesSubject.complete();
    this.loadingSubject.complete();
  }
}
