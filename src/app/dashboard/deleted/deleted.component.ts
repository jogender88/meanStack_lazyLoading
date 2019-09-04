import { Component, OnInit } from '@angular/core';
import { GetpostService } from '../../services/getpost.service';
import { PaginationService } from '../../services/pagination.service';
import {AuthenticationService} from '../../services/authentication.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css']
})
export class DeletedComponent implements OnInit {

  constructor(private newService: GetpostService,private paginationservice: PaginationService) { }
  
  deldata;
  delUserData
  errorMessage;
  pager: any = {};
  pagedItems: any[];
  pageno = 1;

  ngOnInit() {

    this.newService.getDeletedUser()
      .subscribe(data => {
        this.deldata = data;
        if (this.deldata.statusCode == 200) {
          this.delUserData = this.deldata.data;
        this.setPage(1)
      }
      });
  }

  deleteduser() {
    this.newService.getDeletedUser()
      .subscribe(data => {
        this.deldata = data;
        if (this.deldata.statusCode == 200) {
          this.delUserData = this.deldata.data;
        this.setPage(this.pageno)}
      });
  }

  admindeleteUser(id) {
    this.newService.admindeleteUser(id)
      .subscribe(data => {
        this.deleteduser();
      }
        , error => this.errorMessage = error);
  }
  
  setPage(page: number) {
    this.pageno = page;
    this.pager = this.paginationservice.getpager(this.delUserData.length, page);
    this.pagedItems = this.delUserData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
