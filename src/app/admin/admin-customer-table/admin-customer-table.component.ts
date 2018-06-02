import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-customer-table',
  templateUrl: './admin-customer-table.component.html',
  styleUrls: ['./admin-customer-table.component.css']
})
export class AdminCustomerTableComponent implements OnInit {

  customers: any[];
  modalRef: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.adminService.getAllCustomers().subscribe(
      res => {
        if (res instanceof Array) {
          res.forEach(customerElement => {
            customerElement.toRemove = false;
            customerElement.toUpdate = false;
            customerElement.color = "#c6b9ab;"
          });
          this.customers = res;
        }
      },
      err => {

      }
    );
  }

  public addCustomerToArray(customer) {
    this.customers.push(customer);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  public updateSelectedCustomers() {
    this.customers.forEach(customer => {
      if (customer.toUpdate == true)
        this.updateCustomer(customer).then();
    });
  }

  public removeSelectedCustomers() {
    this.customers.forEach(customer => {
      if (customer.toRemove == true)
        this.removeCustomer(customer).then(() => {
          for (let i = 0; i < this.customers.length; i++) {
            if (this.customers[i].id == customer.id) {
              this.customers.splice(i, 1);
              break;
            }
          }
        });
    });
  }

  async updateCustomer(customer) {
    return this.adminService.updateCustomer(customer).subscribe(
      res => {
        if (res.responseCode == 0) {
          customer.color = "red";
        } else if (res.responseCode == 1) {
          customer.color = "#c6b9ab";
        }
      },
      err => {
        customer.color = "red";
        console.log(err.error);
      }
    );;
  }

  async removeCustomer(customer) {
    this.adminService.deleteCustomer(customer.id).subscribe(
      res => {
        if (res.responseCode == 0) {
          customer.color = "red";
        } else if (res.responseCode == 1) {
          return;
        }
      },
      err => {
        customer.color = "red";
        console.log(err.error);
      }
    );
  }
}
