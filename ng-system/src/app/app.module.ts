import { HttpService } from './services/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

/* services */
import { LoadingService } from './public/loading/loading.service';
import { PromptService } from './public/prompt/prompt.service';
import { ConfirmService } from './public/confirm/confirm.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './frames/header/header.component';
import { NavComponent } from './frames/nav/nav.component';
import { FooterComponent } from './frames/footer/footer.component';
import { ContainerComponent } from './frames/container/container.component';
import { WelcomeComponent } from './frames/welcome/welcome.component';
import { ListComponent } from './home/demo/list/list.component';
import { DetailsComponent } from './home/demo/details/details.component';
import { PromptComponent } from './public/prompt/prompt.component';
import { ConfirmComponent } from './public/confirm/confirm.component';
import { LoadingComponent } from './public/loading/loading.component';
import { BlockComponent } from './public/block/block.component';
import { ErrorComponent } from './error/error.component';
import { PagesComponent } from './public/pages/pages.component';
import { DatepickerComponent } from './public/datepicker/datepicker.component';
import { LoginComponent } from './login/login.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    ContainerComponent,
    WelcomeComponent,
    ListComponent,
    DetailsComponent,
    PromptComponent,
    ConfirmComponent,
    LoadingComponent,
    BlockComponent,
    ErrorComponent,
    PagesComponent,
    DatepickerComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularEchartsModule
  ],
  providers: [LoadingService, PromptService, ConfirmService, HttpService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
