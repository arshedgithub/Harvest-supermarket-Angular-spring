import {Brand} from "./brand";
import {Unittype} from "./unittype";
import {Subcategory} from "./Subcategory";
import {Itemstatus} from "./itemstatus";

export class Item {

  public id !: number;
  public brand !: Brand;
  public subcategory !: Subcategory;
  public name !: string;
  public code !: string;
  public unittype !: Unittype;
  public sprice !: number;
  public pprice !: number;
  public photo !: string;
  public quantity !: number;
  public rop !: number;
  public itemstatus !: Itemstatus;
  public dointroduced !: string;

  constructor(id: number, brand: Brand, subcategory: Subcategory, name: string, code: string, unittype: Unittype, sprice: number, pprice: number, photo: string, quantity: number, rop: number, itemstatus: Itemstatus, dointroduced: string) {
    this.id = id;
    this.brand = brand;
    this.subcategory = subcategory;
    this.name = name;
    this.code = code;
    this.unittype = unittype;
    this.sprice = sprice;
    this.pprice = pprice;
    this.photo = photo;
    this.quantity = quantity;
    this.rop = rop;
    this.itemstatus = itemstatus;
    this.dointroduced = dointroduced;
  }
}
