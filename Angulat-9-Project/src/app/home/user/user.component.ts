import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../models/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public userList: UserInfo[] = [];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.userService.getUserList().subscribe((res: any) => {
      this.userList = res;
    }, (error) => {
      console.log(error);
    });
  }

}
