import { Component } from '@angular/core';
import { UserServiceService } from '../user-service/user-service.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  constructor(
    private userService: UserServiceService,
    private dialog: MatDialog
  ) {}
  userList: any = [];
  ngOnInit() {
    this.getUsersList();
  }
  getUsersList() {
    this.userService.fetchUsersList().subscribe((userData) => {
      if (userData?.length) {
        this.userList = userData;
        console.log(this.userList);
      }
    });
  }
  openDialog(userDetails: any): void {
    this.dialog.open(UserDetailsComponent, {
      width: '250px',
      height: '250px',
      data: userDetails,
      disableClose: false,
    });
  }
}
