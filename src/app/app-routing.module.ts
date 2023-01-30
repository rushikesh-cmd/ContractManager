import { ManageComponent } from './components/Manage/manage/manage.component';
import { ContractComponent } from './components/Contract/contract/contract.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : "contract",
    component : ContractComponent
  },
  {
    path : "manage",
    component : ManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
