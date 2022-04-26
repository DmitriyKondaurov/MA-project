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
import { AddNewComponent } from './components/add-new/add-new.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
