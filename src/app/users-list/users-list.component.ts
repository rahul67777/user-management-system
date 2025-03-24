import { Component } from '@angular/core';
import { UserServiceService } from '../user-service/user-service.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  standalone: false,
})
export class UsersListComponent {
  value: string = '';
  userList: any = [];
  sortBy: any = [];
  displayedUsers: any[] = [];
  currentPage: number = 1;
  usersPerPage: number = 3;
  type: any;
  constructor(
    private userService: UserServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.getUsersList();
  }
  getUsersList() {
    this.userService.fetchUsersList().subscribe((userData) => {
      if (userData?.length) {
        this.userList = userData;
        this.updateDisplayedUsers();
      }
    });
  }
  openDialog(userDetails: any): void {
    this.dialog.open(UserDetailsComponent, {
      width: '400px',
      height: '500px',
      data: userDetails,
      disableClose: false,
    });
  }
  sortUsers(key: string): void {
    this.displayedUsers.sort((a: any, b: any) => {
      const valA = a[key].toLowerCase();
      const valB = b[key].toLowerCase();
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });
  }

  convertToCSV(array: any[]): string {
    const keys = Object.keys(array[0]);
    const csvRows = [];
    csvRows.push(keys.join(','));
    for (const row of array) {
      const values = keys.map((key) => row[key]);
      csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
  }

  downloadCSV(): void {
    const csvData = this.convertToCSV(this.displayedUsers);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'users.csv');
      link.click();
    }
  }
  updateDisplayedUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    this.displayedUsers = this.userList.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage * this.usersPerPage < this.userList.length) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }
  openAddUserDialog(type: string, userDetails: any) {
    this.type = 'delete';
    const dialog = this.dialog.open(AddEditUserComponent, {
      height: '400px',
      width: '400px',
      disableClose: false,
      data: { actionType: type, userDetails: userDetails },
    });
    dialog.afterClosed().subscribe(() => {
      this.type = '';
    });
  }
}
