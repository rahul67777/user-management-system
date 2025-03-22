import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersListComponent } from '../users-list/users-list.component';
import { log } from 'node:console';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  userDetails: any;
  constructor(
    public dialogRef: MatDialogRef<UsersListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    if (this.data) {
      this.userDetails = this.data;
    }
  }
}
