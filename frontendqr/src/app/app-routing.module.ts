import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrpageComponent} from './qrpage/qrpage.component';
import { PramaanpageComponent } from './pramaanpage/pramaanpage.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InvalidDidComponent } from './invalid-did/invalid-did.component';
import { UserAuthorisedComponent } from './user-authorised/user-authorised.component';

// import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    component: PramaanpageComponent,
  },
  {
    path:'register',
    component: HomepageComponent,
  },
  {
    path: 'user-verification',
    component: MainPageComponent
  },
  {
    path: 'generate-qr',
    component: QrpageComponent
  },
  {
    path: 'invalid-did',
    component: InvalidDidComponent
  },
  {
    path: 'user-authorised',
    component: UserAuthorisedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
