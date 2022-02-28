import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileDataSource } from '../../services/file.datasource';
import { FileService } from '../../services/file.service';
import { merge, fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
} from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { FileModel, IQueryParamsFile } from '../../models/file.model';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit, AfterViewInit, OnDestroy {
  totalCount = 0;
  hasError = false;
  filter: IQueryParamsFile = {
    page: 0,
    size: 10,
  };
  dataSource!: FileDataSource;

  displayedColumns: string[] = [
    'name',
    // 'url',
    'created',
    'actions',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private unsubscribe: Subscription[] = [];

  constructor(private router: Router, private service: FileService) { }

  ngOnInit(): void {
    this.dataSource = new FileDataSource(this.service);
    this.dataSource.loadFiles(this.filter);
    const subs = this.service.totalIPCountEvent.subscribe(
      (t) => (this.totalCount = t)
    );
    this.unsubscribe.push(subs);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadFilesPage()))
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  loadFilesPage = () => {
    this.filter = {
      ...this.filter,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
    };
    this.dataSource.loadFiles(this.filter);
  };

  downloadFile = (file: FileModel) => {
    const fileUrl = file.url;
    window.open(fileUrl)
  };

  gotoCreate = () => {
    this.router.navigate(['file-management', 'create']);
  };

  filterFiles = (ev: { index: any }) => {
    this.loadFilesPage();
  };
}
