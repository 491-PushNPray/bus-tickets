import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Master } from '../../services/master';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, FormsModule, DatePipe],
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search implements OnInit {

  locations$: Observable<any[]> = new Observable<any[]>;
  masterSrv = inject(Master);
  busList = signal<any[]>([]);

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
      this.busList.set(res);
    });
  }

  time(s: string): string {
    return new Date(s).toTimeString().slice(0, 5);      // "16:36"
  }

  duration(dep: string, arr: string): string {
    const mins = Math.round((new Date(arr).getTime() - new Date(dep).getTime()) / 60000);
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  }
}
