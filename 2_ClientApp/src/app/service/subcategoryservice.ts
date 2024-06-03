import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../entity/category";
import {Subcategory} from "../entity/Subcategory";

@Injectable({
  providedIn: 'root'
})

export class SubcategoryService {

  constructor(private http: HttpClient) {  }

  async getAllList(qry: string): Promise<Array<Subcategory>> {
    const subcategories = await this.http.get<Array<Subcategory>>('http://localhost:8080/subcategories/list' + qry).toPromise();
    if(subcategories == undefined){
      return [];
    }
    return subcategories;
  }

}


