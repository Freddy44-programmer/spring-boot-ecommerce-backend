import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from  'rxjs'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  
  private baseUrl = 'http://localhost:8080/api/products';
 
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}


  getProductListPagination(thePage: number,thePageSize: number, theCategoryId: number): Observable<GetResponseProducts>{
    // build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` 
    + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }



  getProductList(theCategoryId: number): Observable<Product[]>{
    // build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }



  searchProducts(theKeyword: string): Observable<Product[]> {
    // build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
 }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(reponse => reponse._embedded.products)
    );
  }


  getProduct(theProductId: number):Observable<Product>{
    //build URL based on the product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);

  }

  // 
  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(reponse => reponse._embedded.productCategory)
    );
  }
}

interface GetResponseProducts{
  // unwraps the JSON from Spring Data Rest _embedded entry
  _embedded: {
       products: Product[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}


interface GetResponseProductCategory{
  // unwraps the JSON from Spring Data Rest _embedded entry
  _embedded: {
       productCategory: ProductCategory[];
  }

}
