import { HttpClient } from '@angular/common/http';


import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

    //Init and declare the rates object we get from API
    currencyApiResponse: {
      base: string;
      date: string;
      rates: {};  
    }

    constructor(private httpClient: HttpClient){
    }


    getRatesFromExternalApi() {
        this.httpClient
          .get<any>('https://api.exchangeratesapi.io/latest')
          .subscribe(
            (response) => {
              this.currencyApiResponse = response;
            },
            (error) => {
              console.trace('Erreur de chargement', error);
            }
          );
    }

   
    getRatesOfCurrency(currency){
        return this.currencyApiResponse.rates[currency]

    }

}
