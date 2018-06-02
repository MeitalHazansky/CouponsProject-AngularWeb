import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Company } from '../../models/company';
import { AdminService } from '../../services/admin/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-company-table',
  templateUrl: './admin-company-table.component.html',
  styleUrls: ['./admin-company-table.component.css']
})
export class AdminCompanyTableComponent implements OnInit {

  companies: any[];
  modalRef: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.adminService.getAllCompanies().subscribe(
      res => {
        if (res instanceof Array) {
          res.forEach(companyElement => {
            companyElement.toRemove = false;
            companyElement.toUpdate = false;
            companyElement.color = "#c6b9ab;"
          });
          this.companies = res;
        }
      },
      err => {

      }
    );
  }

  public addCompanyToArray(company) {
    this.companies.push(company);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  public updateSelectedCompanies() {
    this.companies.forEach(company => {
      if (company.toUpdate == true)
        this.updateCompany(company).then();
    });
  }

  public removeSelectedCompanies() {
    this.companies.forEach(company => {
      if (company.toRemove == true)
        this.removeCompany(company).then(() => {
          for (let i = 0; i < this.companies.length; i++) {
            if (this.companies[i].id == company.id) {
              this.companies.splice(i, 1);
              break;
            }
          }
        });
    });
  }

  async updateCompany(company) {
    return this.adminService.updateCompany(company).subscribe(
      res => {
        if (res.responseCode == 0) {       
          company.color = "red";
        } else if (res.responseCode == 1) {
          company.color = "#c6b9ab";
        }
      },
      err => {
        company.color = "red";
        console.log(err.error);
      }
    );;
  }

  async removeCompany(company) {
    this.adminService.deleteCompany(company.id).subscribe(
      res => {
        if (res.responseCode == 0) {
          company.color = "red";
        } else if (res.responseCode == 1) {
          return;
        }
      },
      err => {
        company.color = "red";
        console.log(err.error);
      }
    );
  }

}
