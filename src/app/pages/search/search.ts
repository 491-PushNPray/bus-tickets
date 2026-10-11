import { Component, inject, OnInit } from '@angular/core';
import { Master } from '../../services/master';
import { Observable } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search implements OnInit {

  location$: Observable<any[]> = new Observable<any[]>;
  masterSrv = inject(Master);

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.location$ = this.masterSrv.getLocations();
}
}
