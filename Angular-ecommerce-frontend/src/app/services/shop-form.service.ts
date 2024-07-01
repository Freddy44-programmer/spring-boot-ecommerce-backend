import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { Province } from '../common/province';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesURL = 'http://localhost:8080/api/countries';
  private provincesURL = 'http://localhost:8080/api/provinces';

  constructor(private httpClient: HttpClient) { }


  getCountries(): Observable<Country[]>{

    return this.httpClient.get<GetResponseCountries>(this.countriesURL).pipe(
      map(response => response._embedded.countries)
    );
  }

  getProvinces(theCountryCode: string): Observable<Province[]>{
    //search url
     const searchProvincesUrl = `${this.provincesURL}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseProvinces>(searchProvincesUrl).pipe(
      map(response => response._embedded.provinces)
    );
  }


  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] =[];

    //build an array for "Month" dropdown list
    // start at current month and loop until

    for (let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    return of (data);
  }



  getCreditCardYears(): Observable<number[]>{

    let data: number[] =[];

    //build an array for "Year" dropdown list
    // start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of (data);
  }
}

interface GetResponseCountries{
  _embedded: {
    
    countries: Country[];
  }
}

interface GetResponseProvinces{
  _embedded: {

    provinces: Province[];
  }
}