import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css'
})
export class OperationsComponent implements OnInit{
  accountNumber: Number;
  type: string;
  amount: number;
  interest: number;
  numberOfPayments: number;

  constructor(private http: HttpClient) {}
  ngOnInit(){

  }

  getOperations() {
    this.http.get(`/api/accounts/${this.accountNumber}/operations`)
    .subscribe(data => {
      console.log(data);
    });
}

addOperation() {
  const operation = { accountNumber: this.accountNumber, type: this.type };
  if (this.type === 'withdrawal' || this.type === 'deposit') {
    operation['amount'] = this.amount;
  } else if (this.type === 'loan') {
    operation['amount'] = this.amount;
    operation['interest'] = this.interest;
    operation['numberOfPayments'] = this.numberOfPayments;
  }
  this.http.post('/api/accounts/operations', operation).subscribe(response => {
    console.log(response);
  });
}
}
