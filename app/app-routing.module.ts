import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { InfoComponent } from './info/info.component';
import { UpdateComponent } from './update/update.component';
import { ReviewComponent } from './review/review.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'review/:id',component: ReviewComponent },

  { path: 'review/:id',component: InfoComponent },
  
  { path: 'create',component: CreateComponent },
  { path: 'info/:id',component: InfoComponent },
  { path: 'update/:id',component: UpdateComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: PagenotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
