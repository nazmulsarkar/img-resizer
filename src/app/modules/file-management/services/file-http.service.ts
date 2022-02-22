import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FileModel } from '../models/file.model';

const API_FILES_URL = `${environment.apiUrl}/files`;
const authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

@Injectable({
  providedIn: 'root',
})
export class FileHttpService {
  private httpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.getAuthTokenLocalStorage()}`,
    // 'Content-Type': 'multipart/form-data; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  create(createModel: any) {
    return this.http.post<FileModel>(
      `${API_FILES_URL}`,
      {
        ...createModel,
      },
      {
        headers: this.httpHeaders,
      }
    );
  }

  findOne(id: string) {
    return this.http.get<FileModel>(`${API_FILES_URL}/${id}`, {
      headers: this.httpHeaders,
    });
  }

  update(id: string, updateModel: any) {
    if (updateModel.file) {
      updateModel.file = undefined;
    }
    return this.http.patch<FileModel>(
      `${API_FILES_URL}/${id}`,
      {
        ...updateModel,
      },
      {
        headers: this.httpHeaders,
      }
    );
  }

  findAllFiles(queryString: string): Observable<any> {
    return this.http.get<FileModel[]>(`${API_FILES_URL}${queryString}`, {
      headers: this.httpHeaders,
    });
  }

  private getAuthTokenLocalStorage(): string | undefined {
    try {
      const tokenData = localStorage.getItem(authLocalStorageToken)
      const authData = JSON.parse(tokenData!);
      return authData && authData.token;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  uploadFiles(files: any): Observable<any> {
    console.log(this.httpHeaders)
    return this.http.post<FileModel[]>(
      `${API_FILES_URL}/upload-files`,
      files,
      {
        headers: this.httpHeaders,
      }
    );
  }
}
