import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PayBillsComponent } from './pay-bills/pay-bills.component';
import { RegistrationComponent } from './registration/registration.component';
import { TopUpComponent } from './top-up/top-up.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  // { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path:'home', component: TopUpComponent},
  { path:'pay', component: PayBillsComponent},
  { path:'transfers', component: TransferMoneyComponent},
  { path:'transactions', component: TransactionHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
