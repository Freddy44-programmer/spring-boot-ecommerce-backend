import { Component } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './dropdown-product-category-menu.component.html',
  styleUrls: ['./dropdown-product-category-menu.component.css']
})
export class ProductCategoryMenuComponent {

  menuOpen: boolean = false;
  isSmallScreen: boolean = false;
  isHovered: boolean = false;
  productCategories: ProductCategory[] = [];
  selectedValue: string = 'Shop by Category';

  constructor(private productService: ProductService) {

    this.checkScreenSize(); 
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  ngOnInit() {
    this.listProductCategories();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openMenu() {
    this.menuOpen = true;
  }
  
  closeMenu() {
    this.menuOpen = false;
  }
  

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768; 
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );
  }

  clickHandler(categoryName: string) {
    this.toggleMenu();
  }
}
