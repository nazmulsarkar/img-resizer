import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-management-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss'],
})
export class FileManagementComponent implements OnInit {
  constructor(private router: Router) {
    if (location.pathname === '/file-management') {
      this.router.navigate(['file-management/list']);
    }
  }

  ngOnInit(): void { }
}
