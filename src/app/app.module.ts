import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserDataService } from './services/user-data.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/components/header/header.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';

//Guards
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertModule } from './shared/components/alert/alert.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    AlertModule
  ],
  providers: [
    UserDataService,
    SecureInnerPagesGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
