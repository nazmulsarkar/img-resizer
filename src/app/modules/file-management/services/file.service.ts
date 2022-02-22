import { EventEmitter, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { FileCreate, FileModel, IQueryParamsFile } from '../models/file.model';
import { FileHttpService } from './file-http.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  isLoadingSubject: BehaviorSubject<boolean>;
  totalIPCountEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fileHttpService: FileHttpService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
  }

  findFiles(queryParams: IQueryParamsFile): Observable<FileModel[]> {
    const { page, size } = queryParams;
    const pageNumber = page || 0;
    const pageSize = size || 10;

    let queryString = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    return this.fileHttpService.findAllFiles(queryString).pipe(
      map((res) => {
        const totalCount = (res && res.totalCount) || 0;
        const data = (res && res.data) || [];
        this.totalIPCountEvent.emit(totalCount);
        return data;
      })
    );
  }

  create(model: FileCreate): Observable<FileModel> {
    return this.fileHttpService.create(model);
  }

  update(id: string, model: FileCreate): Observable<FileModel> {
    return this.fileHttpService.update(id, model);
  }

  findFile(id: string): Observable<FileModel> {
    return this.fileHttpService.findOne(id);
  }

  uploadFiles(files: any): Observable<any> {
    return this.fileHttpService.uploadFiles(files);
  }
}
