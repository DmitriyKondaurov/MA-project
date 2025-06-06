import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthGuard } from './services/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopupFormComponent } from './components/popup-form/popup-form.component';
import { Routes, RouterModule } from '@angular/router';
import { TransactionArchiveComponent } from './components/transition-archive/transaction-archive.component';
import { CardComponent } from './components/transition-archive/card/card.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FieldCostComponent } from './components/field-cost/field-cost.component';

import { FillAmountDirective } from './directives/fill-amount.directive';
import { FillCostDirective } from './directives/fill-cost.directive';
import { AddNewComponent } from './components/add-new-btn/add-new.component';
import { TransactFilterPipe } from './components/pipes/transact-filter.pipe';
import { TotalCostAmountPipe } from './components/pipes/total-cost-amount.pipe';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { FrontPageItemComponent } from './components/front-page-item/front-page-item.component';
import { FieldCostItemComponent } from './components/field-cost-item/field-cost-item.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { CostMonitoringComponent } from './components/cost-monitoring/cost-monitoring.component';
import { StatisticComponent } from './components/cost-monitoring/statistic/statistic.component';
import { StatisticDiagramComponent } from './components/cost-monitoring/statistic-diagram/statistic-diagram.component';
import { StatisticFieldComponent } from './components/cost-monitoring/statistic/statistic-field/statistic-field.component';
import { CostsFilterPipe } from './components/pipes/costs-filter.pipe';
import { DiagramBarComponent } from './components/cost-monitoring/statistic-diagram/diagram-bar/diagram-bar.component';
import { ReportPlanActualComponent } from './components/report-plan-actual/report-plan-actual/report-plan-actual.component';
import { GoalsComponent } from './components/goals/goals.component';
import { CostSortPipe } from './components/pipes/cost-sort.pipe';



const appRoutes: Routes = [
  { path: 'archive', component: TransactionArchiveComponent, canActivate: [AuthGuard] },
  { path: 'monitoring', component: CostMonitoringComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportPlanActualComponent, canActivate: [AuthGuard] },
  { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
  { path: '', component: MainPageComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    PopupFormComponent,
    TransactionArchiveComponent,
    CardComponent,
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
    MainPageComponent,
    CostMonitoringComponent,
    StatisticComponent,
    StatisticDiagramComponent,
    StatisticFieldComponent,
    CostsFilterPipe,
    DiagramBarComponent,
    ReportPlanActualComponent,
    CostSortPipe,
    GoalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
