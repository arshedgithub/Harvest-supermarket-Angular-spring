import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Itemstatus} from "../entity/itemstatus";
import {Category} from "../entity/category";
import {Unittype} from "../entity/unittype";

@Injectable({
  providedIn: 'root'
})

export class UnittypeService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Unittype>> {
    const unittypes = await this.http.get<Array<Unittype>>('http://localhost:8080/unittypes/list').toPromise();
    if(unittypes == undefined){
      return [];
    }
    return unittypes;
  }

}


