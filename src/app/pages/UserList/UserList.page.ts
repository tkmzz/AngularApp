import { Component } from "@angular/core";

import { UsersService } from "../../services/Users.service";

@Component({
  selector: "user-list",
  templateUrl: "./UserList.page.html",
  styleUrls: ["./UserList.page.css"]
})
export class UserListPage {

  constructor(private usersService: UsersService) { }

  private users = []

  ngOnInit(id: string) {
    this.usersService.getAllUsers(id).subscribe((data: any) => {
      data.forEach(element => {
        this.users.push(element.payload.doc.data())
      });
    })
  }
}
