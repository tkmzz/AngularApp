import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserListPage } from "./pages/UserList/UserList.page";
import { UserComponent } from "./pages/User/User.page";

const routes: Routes = [
  { path: "", component: UserListPage },
  { path: 'user', component: UserComponent },
  { path: "user/:id", component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
