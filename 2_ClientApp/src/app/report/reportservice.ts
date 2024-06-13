import {CountByDesignation} from "./entity/countbydesignation";
import {CountByCategory} from "./entity/countbycategory";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http: HttpClient) {  }

  async countByDesignation(): Promise<Array<CountByDesignation>> {

    const countbydesignations = await this.http.get<Array<CountByDesignation>>('http://localhost:8080/reports/countbydesignation').toPromise();
    if(countbydesignations == undefined){
      return [];
    }
    return countbydesignations;
  }

  async itemCountByCategory(): Promise<Array<CountByCategory>> {

    const countbycategories = await this.http.get<Array<CountByCategory>>('http://localhost:8080/reports/itemcountbycategories').toPromise();
    if(countbycategories == undefined){
      return [];
    }
    return countbycategories;
  }

}


