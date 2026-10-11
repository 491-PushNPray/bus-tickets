import { Component, inject, OnInit } from '@angular/core';
import { Master } from '../../services/master';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, FormsModule],
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search implements OnInit {

  locations$: Observable<any[]> = new Observable<any[]>;
  masterSrv = inject(Master);
  busList: any[] = [];

  searchObj: any = {
    fromLocation: '',
    toLocation: '',
    travelDate: ''
  }

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locations$ = this.masterSrv.getLocations();
  }

  onSearch() {
    const {fromLocation, toLocation, travelDate} = this.searchObj;
    this.masterSrv.searchBus(fromLocation, toLocation, travelDate).subscribe((res:any[]) => {
      this.busList = res;
    });
  }
}
