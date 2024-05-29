import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Itemstatus} from "../entity/itemstatus";
import {Category} from "../entity/category";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) {  }


  async getAllList(query:string): Promise<Array<Category>> {
    const categories = await this.http.get<Array<Category>>('http://localhost:8080/categories/list').toPromise();
    if(categories == undefined){
      return [];
    }
    return categories;
  }

}


