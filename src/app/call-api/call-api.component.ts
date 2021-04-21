import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { AuthService } from '../services/auth.service'

@Component({
    selector: 'app-call-api',
    templateUrl: './call-api.component.html',
})
export class CallApiComponent implements OnInit {

  response:any;
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
      let headers = new HttpHeaders({ 'Authorization': this.authService.getAuthorizationHeaderValue() });

      // Enable CORS on the API endpoint as the call is made from javascript.
      this.http.get("https://apiendpoint/list", { headers: headers })
        .subscribe(
          response => { 
            console.log(response);
            this.response = response }
          );
  }

  printList() {
    return this.response ? this.response.list[0] : '';
  }
}