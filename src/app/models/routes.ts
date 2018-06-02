import { Route } from "@angular/router";
import { AdminMainComponent } from "../admin/admin-main/admin-main.component";
import { HomeComponent } from "../main/home/home.component";
import { CompanyMainComponent } from "../company/company-main/company-main.component";
import { CustomerMainComponent } from "../customer/customer-main/customer-main.component";
import { StoreMainComponent } from "../store/store-main/store-main.component";

export class ProjectRoutes {
    public static routes: Route[] = [
        {path: "", redirectTo: "/home", pathMatch: "full"},
        {path: "home", component: HomeComponent},
        {path: "admin", component: AdminMainComponent},
        {path: "company", component: CompanyMainComponent},
        {path: "customer", component: CustomerMainComponent},
        {path: "store", component: StoreMainComponent}
    ];

}