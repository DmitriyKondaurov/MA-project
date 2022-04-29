import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FieldCostComponent } from './components/field-cost/field-cost.component';
import { FieldCostItemComponent } from './components/field-cost-item/field-cost-item.component';
import { FrontPageItemComponent } from './components/front-page-item/front-page-item.component';
import { FillAmountDirective } from './directives/fill-amount.directive';
import { FillCostDirective } from './directives/fill-cost.directive';
import { AddNewComponent } from './components/add-new-btn/add-new.component';
import {HttpClientModule} from "@angular/common/http";
import { TransactFilterPipe } from './components/pipes/transact-filter.pipe';
import { TotalCostAmountPipe } from './components/pipes/total-cost-amount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FieldCostComponent,
    FieldCostItemComponent,
    FrontPageItemComponent,
    FillAmountDirective,
    FillCostDirective,
    AddNewComponent,
    TransactFilterPipe,
    TotalCostAmountPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
