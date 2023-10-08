import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { InvalidDidComponent } from './invalid-did/invalid-did.component';
import { UserAuthorisedComponent } from './user-authorised/user-authorised.component';
// import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HomepageComponent,
    InvalidDidComponent,
    UserAuthorisedComponent,
    // AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
