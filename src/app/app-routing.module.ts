import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AdminGuard } from './Guards/admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { PreventUnsavedGuard } from './Guards/prevent-unsaved.guard';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailResolver } from './_resolvers/member-detailed.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path:'',
    runGuardsAndResolvers: 'always',
    canActivate:[AuthGuard],
    children:[
      {path: 'member', component: MemberListComponent},
      {path: 'member/:username', component: MemberDetailComponent , resolve:{member:MemberDetailResolver}},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'members/edit', component: MemberEditComponent, canDeactivate:[PreventUnsavedGuard]},
      {path: 'admin', component: AdminPanelComponent, canActivate:[AdminGuard]},
  

    ]
  },

  {path : 'errors',component:TestErrorsComponent},
  {path : 'not-found',component:NotFoundComponent},
  {path : 'server-error',component:ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
