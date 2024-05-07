import {Brand} from "./brand";
import {Category} from "./category";

export class Categorybrand {

  public id !: number;
  public brand !: Brand;
  public category !: Category;

  constructor(id: number, brand: Brand, category: Category) {
    this.id = id;
    this.brand = brand;
    this.category = category;
  }
}
