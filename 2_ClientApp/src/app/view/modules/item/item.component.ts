import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Item} from "../../../entity/item";
import {UiAssist} from "../../../util/ui/ui.assist";
import {ItemService} from "../../../service/itemservice";
import {Employee} from "../../../entity/employee";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  columns: string[] = ['name', 'code', 'unittype', 'sprice', 'pprice', 'modi'];
  headers: string[] = ['Name', 'Code', 'Unit Type', 'Sale Price', 'Purchase Price', 'Modification'];
  binders: string[] = ['name', 'code', 'unittype.name', 'sprice', 'pprice', 'getModi()'];

  cscolumns: string[] = ['csname', 'cscode', 'csunittype', 'cssprice', 'cspprice', 'csmodi'];
  csprompts: string[] = ['Search by Number', 'Search by Name', 'Search by Gender',
    'Search by Designation', 'Search by Full Name', 'Search by Modi'];

  public csearch!: FormGroup;

  items: Array<Item> = [];
  data!: MatTableDataSource<Item>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  uiassist: UiAssist;


  constructor(private fb:FormBuilder, private is:ItemService) {

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      'csname': new FormControl(),
      'cscode': new FormControl(),
      'csunittype': new FormControl(),
      'cssprice': new FormControl(),
      'cspprice': new FormControl(),
      'csmodi': new FormControl()
    })

  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.createView();
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  loadTable(query: string) {

    this.is.getAll(query)
      .then((items: Item[]) => {
        this.items = items;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.items);
        this.data.paginator = this.paginator;
      });
  }

  filterTable():void {
    const cssearchdata = this.csearch.getRawValue();

    this.data.filterPredicate = ((item: Item, filter: String) => {
      return (cssearchdata.csname == null || item.name.includes(cssearchdata.csname)) &&
        (cssearchdata.cscode == null || item.code.includes(cssearchdata.cscode)) &&
        (cssearchdata.csunittype == null || item.unittype.name.includes(cssearchdata.csunittype)) &&
        (cssearchdata.cssprice == null || item.sprice.toString().includes(cssearchdata.cssprice)) &&
        (cssearchdata.cspprice == null || item.pprice.toString().includes(cssearchdata.cspprice)) &&
        (cssearchdata.csmodi == null || this.getModi(item).toLowerCase().includes(cssearchdata.csmodi));
    });
    this.data.filter = "xx";

  }



  getModi(element: Item) {
    return element.name + '(' + element.code + ')';
  }


}
