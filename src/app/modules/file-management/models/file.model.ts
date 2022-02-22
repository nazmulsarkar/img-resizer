export class FileModel {
  id = '';
  name = '';
  key = '';
  url = '';
  createdAt = '';
  updatedAt = '';

  setUser(fileModel: FileModel) {
    this.id = fileModel.id;
    this.name = fileModel.name;
    this.key = fileModel.key;
    this.url = fileModel.url;
    this.createdAt = fileModel.createdAt;
    this.updatedAt = fileModel.updatedAt;
  }
}

export interface IPagination {
  page: number;
  size: number;
}

export interface FileCreate {
  id?: string;
  name: string;
  key: string;
  url: string;
}

export interface IQueryParamsFile {
  id?: string;
  search?: string;
  page?: number;
  size?: number;
}
