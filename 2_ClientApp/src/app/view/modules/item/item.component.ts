import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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

  cscolumns: string[] = ['csnumber', 'cscallingname', 'csgender', 'csdesignation', 'csname', 'csmodi'];
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

  getModi(element: Item) {
    return element.name + '(' + element.code + ')';
  }


}
