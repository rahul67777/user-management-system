import { Component, Inject } from '@angular/core';
import { UserServiceService } from '../user-service/user-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css',
  standalone: false,
})
export class AddEditUserComponent {
  model: any = {};
  constructor(
    private userService: UserServiceService,
    public dialogRef: MatDialogRef<UsersListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.actionType === 'edit') {
      this.model.name = this.data?.userDetails?.name;
      this.model.username = this.data?.userDetails?.username;
      this.model.phone = this.data?.userDetails?.phone;
      this.model.email = this.data?.userDetails?.email;
    } else {
      this.model = {};
    }
  }

  addUser() {
    if (this.data?.actionType === 'edit') {
      this.userService
        .editUser(this.model, this.data?.userDetails?.id)
        .subscribe((result) => {
          if (result) {
            this.dialogRef.close();
          }
        });
    } else {
      this.userService.addUser(this.model).subscribe((result) => {
        if (result) {
          this.dialogRef.close();
        }
      });
    }
  }
  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((result) => {
      if (result) {
        this.dialogRef.close();
      }
    });
  }
}
