import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResultModel } from '../model/interface/role';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {

   }

   getDesignation():Observable<APIResultModel>{
    return this.http.get<APIResultModel>(environment.API_URL+'GetAllDesignation')
   }
}
