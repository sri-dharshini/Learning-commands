import { Component, OnInit } from '@angular/core';
import { Product } from '../models/addproduct.model';
import { updateproduct } from '../models/updateProduct.model';
import { AddProductService } from '../services/addproducts.service';
import { authService } from '../services/auth.service';
import { RetailerService } from '../services/Retailer.service';
import { UpdateProductService } from '../services/updateproduct.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
products:any;
retailers:any;

updateproduct:updateproduct;
updated_Products:any;
retproducts:any;
msg:any;
  constructor(private authservic:authService,private addproductservice:AddProductService,
    private updateproductservice:UpdateProductService,private retailerservice:RetailerService) { 
    this.updateproduct=new updateproduct();
    this.addproductservice.getAllProducts().subscribe(a=>{
      this.products=a;
     
    })
    this.retailerservice.getAllRetailers().subscribe(a=>{
      this.retailers=a;

    })

    this.updateproductservice.getretailerProducts(this.authservic.retailerid).subscribe(a=>{
      this.retproducts=a;
    })
  }
 
    onSubmit()
      { 
    this.updateproduct.Retail_Id=this.authservic.retailerid;
   this.updateproduct.Update_Status="pending";
    console.log(this.updateproduct);
    this.updateproductservice.updateProducts(this.updateproduct).subscribe(u=>{this.updated_Products = u;alert('Update Request submitted successfully')},
      err=>this.msg = err.error.Message);
      console.log(this.updated_Products);
  }

  ngOnInit(): void {
  }

}

