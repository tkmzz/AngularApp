import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { UsersService } from "../../services/Users.service";

@Component({
  selector: "user-component",
  templateUrl: "./User.page.html",
  styleUrls: ["./User.page.css"]
})

export class UserComponent {

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(''),
    phone: new FormControl('')
  })

  private userId: string = "";
  private documentId: string = ""
  private loading: boolean = false;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) {
    console.log(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id");
    if (this.userId) this.getUser(this.userId)
  }

  private getUser(id: string) {
    this.usersService.getById(id).subscribe((data: any) => {
      const { doc } = data[0].payload
      this.documentId = doc.id

      console.log(doc.id)

      const result = doc.data()

      Object.keys(result)
        .filter(item => item !== 'id')
        .forEach((item) => {
          console.log(item)

          this.userForm.controls[item].setValue(result[item])
        })
    })
  }

  onSubmit() {

    if (this.userId == null) {
      this.loading = true

      this.usersService.create(this.userForm.value)
        .then(() => {
          this.router.navigate(['/']),
            this.loading = false
        })
        .catch((err) => this.loading = false)

    } else {

      const updatedData = {
        id: this.userId,
        ...this.userForm.value
      }

      this.usersService.update(this.documentId, updatedData)
        .then(() => {
          this.router.navigate(['/'])
        })
    }
  }
}
