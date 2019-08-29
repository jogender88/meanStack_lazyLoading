import { Component, OnInit } from '@angular/core';
import { GetpostService } from '../services/getpost.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaginationService } from '../services/pagination.service';
@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {

  constructor(private newService: GetpostService, private paginationservice: PaginationService) { }
  Repdata: any;
  TotalUser: any;
  valbutton = "Save";
  errorMessage;
  msgdata;
  msg;
  userForm;
  searchText: string = "";
  pager: any = {};
  pagedItems: any[];
  submitted = false;
  pageno = 1;
  isdisable = 0;

  ngOnInit() {
    this.newService.GetUser().subscribe(data => {
      this.Repdata = data;
      this.TotalUser = this.Repdata.data
      if (this.Repdata.statusCode == 200) {
        this.TotalUser = this.Repdata.data;
        this.setPage(1);
      }
      else {
        this.msg = "No Data Found " + this.Repdata.errorMsg
      }
    });

    this.userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phn: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]),
    });
  }

  get f() { return this.userForm.controls; }

  onSave(user) {
    user.mode = this.valbutton;
    this.submitted = true;
    this.isdisable = 0;
    if (this.userForm.invalid) {
      return;
    }
    else if (this.userForm.valid) {
      if (user.name.trim() == '' ||user.address.trim() == '' ) {
        this.userForm.controls['name'].setErrors({ required: true });
        this.userForm.controls['address'].setErrors({ required: true });
      }
      else {
        this.newService.save(user)
          .subscribe(data => {
            this.msgdata = data;
            if (this.msgdata.statusCode == 200) {
              this.msg = this.msgdata.msg;
              this.isdisable = 0;
              this.getUser()
              this.refreshform();
            }
            else {
              this.msg = this.msgdata.errorMsg
            }
          }
            , error => {
              console.log(error)
              this.errorMessage = error
            });
      }
    }
  }

  edit(kk, ind) {
    this.userForm.controls['name'].setValue(kk.name);
    this.userForm.controls['address'].setValue(kk.address);
    this.userForm.controls['id'].setValue(kk._id);
    this.userForm.controls['email'].setValue(kk.email);
    this.userForm.controls['phn'].setValue(kk.phn);
    this.valbutton = "Update";
    this.msg = '';
    this.isdisable = ind;
  }

  deleteUser(id) {
    this.newService.deleteUser(id)
      .subscribe(data => {
        this.msgdata = data;
        if (this.msgdata.statusCode == 200) {
          this.msg = this.msgdata.msg;
          this.isdisable = 0;
          this.getUser();
          this.refreshform();
        }
        else {
          this.msg = this.msgdata.errorMsg
        }
      }
        , error => this.errorMessage = error);
  }

  getUser() {
    this.newService.GetUser()
      .subscribe(data => {
        this.Repdata = data;
        if (this.Repdata.statusCode == 200) {
          this.TotalUser = this.Repdata.data;
          this.setPage(this.pageno);
        }
        else {
          this.msg = this.Repdata.errorMsg
        }
      });
  }

  refreshform() {
    this.userForm.controls['name'].setValue('');
    this.userForm.controls['name'].setErrors(null);
    this.userForm.controls['address'].setValue('');
    this.userForm.controls['address'].setErrors(null);

    this.userForm.controls['id'].setValue('');
    this.userForm.controls['id'].setErrors(null);

    this.userForm.controls['email'].setValue('');
    this.userForm.controls['email'].setErrors(null);

    this.userForm.controls['phn'].setValue('');
    this.userForm.controls['phn'].setErrors(null);

    this.valbutton = "Save";
  }

  setPage(page: number) {
    this.pageno = page;
    this.pager = this.paginationservice.getpager(this.TotalUser.length, page);
    this.pagedItems = this.TotalUser.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}