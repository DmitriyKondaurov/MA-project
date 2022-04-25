import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopupFormComponent } from './components/popup-form/popup-form.component';
import { Routes, RouterModule } from '@angular/router';
import { TransitionArchiveComponent } from './components/transition-archive/transition-archive.component';
import { CardComponent } from './components/transition-archive/card/card.component';

const appRoutes: Routes = [
  { path: 'archive', component: TransitionArchiveComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    PopupFormComponent,
    TransitionArchiveComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
