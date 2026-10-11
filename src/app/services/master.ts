import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Service()
export class Master {
    apiURI: string = 'https://api.freeprojectapi.com/api'
    
    constructor(private http: HttpClient) { }

    getLocations(): Observable<any[]> {
        return this.http.get<any[]>(this.apiURI + "GetBusLocations");
    }



}

