import { Component, inject, OnInit } from '@angular/core';
import { Master } from '../../services/master';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe],
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search implements OnInit {

  locations$: Observable<any[]> = new Observable<any[]>;
  masterSrv = inject(Master);

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locations$ = this.masterSrv.getLocations();
  }
}
