// -- IMPORTS -- //

  // NG Module
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  // Init and declare the rates object we get from API
  currencyApiResponse: {
    base: string;
    date: string;
    rates: {};
  };

  constructor(private httpClient: HttpClient){
  }

  /**
   * @desc Get currrent currency rate from an external API and store it in the currency objects
   * @param title - the title of the dialog, a summary of the action or confirmation asked to the user
   */
  getRatesFromExternalApi(): void {
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

  /**
   * @desc Use the list of currency stored to get a dedicated currency rate
   * @param currency - the ISO 4217 currency code of the currency rate we are looking for
   * @returns current rate number of the currency
   */
  getRatesOfCurrency(currency): number {
      return this.currencyApiResponse.rates[currency];

  }

}
