import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/class/Client';
import { environment } from '../../environments/environment.development';
import { APIResultModel } from '../model/interface/role';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
 // constructor(private http: HttpClient) {}
  private http:HttpClient= inject<HttpClient>(HttpClient)

  getAllClients(): Observable<APIResultModel> {
    return this.http.get<APIResultModel>(environment.API_URL + 'GetAllClients');
  }

  addUpdateClient(obj: Client): Observable<APIResultModel> {
    return this.http.post<APIResultModel>(environment.API_URL + 'AddUpdateClient/',obj);
  }
  deleteClientById(id:number): Observable<APIResultModel> {
    return this.http.delete<APIResultModel>(environment.API_URL + 'DeleteClientByClientId/'+id);
  }
//Employee
  getAllEmployee(): Observable<APIResultModel>{
    return this.http.get<APIResultModel>(environment.API_URL+'GetAllEmployee')
  }

  AddUpdateClientProject(obj: Client): Observable<APIResultModel> {
    return this.http.post<APIResultModel>(environment.API_URL + 'AddUpdateClientProject/',obj);
  }

  getAllUsers (){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
}
