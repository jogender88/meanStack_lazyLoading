import { Component, OnInit } from '@angular/core';
import { GetpostService } from '../../services/getpost.service';
import { FormBuilder,
         FormArray, 
         FormGroup, 
         FormControl, 
         Validators } from '@angular/forms';
import { PaginationService } from '../../services/pagination.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {

  constructor(private routes: Router, private fromBuilder: FormBuilder, private authenticationService: AuthenticationService, private newService: GetpostService, private paginationservice: PaginationService) { }
  
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  
  Repdata: any;
  TotalUser: any;
  valbutton = "Save";
  errorMessage='';
  msgdata;
  msg='';
  userForm: FormGroup;
  searchText: string = "";
  pager: any = {};
  pagedItems: any[];
  submitted = false;
  pageno = 1;
  isdisable = 0;
  addForm: FormGroup;
  items: FormArray;
  ngOnInit() {
    this.counter();
    
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
    }, error => {
      this.msg = "404 Not Found"
    });

    this.userForm = this.fromBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      other: this.fromBuilder.array([]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phn: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]),
    });
  }

  get f() { return this.userForm.controls; }

  createItem(): FormGroup {
    return this.fromBuilder.group({
      itemName: '',
      description: '',
      price: ''
    });
  }
  // addItem(){
  //   this.items=this.addForm.get('items') as FormArray;
  //   this.items.push(this.createItem());
  // }
  // removeItem(i){
  //   this.items.removeAt(i);
  //   }
  addItem() {
    this.items = this.userForm.get('other') as FormArray;
    this.items.push(this.createItem());
  }
  removeItem(i) {
    this.items.removeAt(i);
  }
  onSave(user) {
    // console.log(user)
    let token = localStorage.getItem('token');
    user.mode = this.valbutton;
    this.submitted = true;
    this.isdisable = 0;
    if (this.userForm.invalid) {
      return;
    }
    else if (this.userForm.valid) {
      if (user.name.trim() == '' || user.address.trim() == '') {
        this.userForm.controls['name'].setErrors({ required: true });
        this.userForm.controls['address'].setErrors({ required: true });
      }
      else {
        this.newService.save(user)
          .subscribe(data => {
            this.msgdata = data;
            // console.log(data)
            if (this.msgdata.statusCode == 200) {
              this.msg = this.msgdata.msg;
              this.isdisable = 0;
              this.getUser()
              this.refreshform();
            }
            if (this.msgdata.statusCode == 401) {
              this.authenticationService.isLoggedIn();
            }
            else {
              this.authenticationService.isLoggedIn();

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
        , error => {

          this.errorMessage = error
        });

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
      }, error => this.errorMessage = error);
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
  num: number = 0;
  num1: number = 0;
  num2: number = 0;
  num3: number = 0;
  num4: number = 0;

  newNum: number;
  studentNum:number;
  courseNum;
  awardNum;
  expertNum;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
  };
  interval: any;
  currentView: string;


  counter() {
    this.newNum = 3000;
    this.studentNum=10532;
    this.courseNum=7984;
    this.awardNum=82;
    this.expertNum=354;
    this.num = this.newNum;
    this.num1 = this.studentNum;
    this.num2 = this.courseNum;
    this.num3 = this.awardNum;
    this.num4 = this.expertNum;

    const that = this;
    this.interval = setInterval(()=> {
      that.newNum += 1;
      that.studentNum+=1;
      that.courseNum+=1;
      that.awardNum+=1;
      that.expertNum+=1;

      that.option = {
        startVal: that.num,
        useEasing: false,
        duration: 160,};
        
      that.num = this.newNum;
      that.num = this.studentNum;
      that.num = this.courseNum;
      that.num = this.awardNum;
      that.num = this.expertNum;
    }, 500000)
  }
}