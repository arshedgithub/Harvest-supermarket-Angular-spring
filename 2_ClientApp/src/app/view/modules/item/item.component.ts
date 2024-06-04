import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Item} from "../../../entity/item";
import {UiAssist} from "../../../util/ui/ui.assist";
import {ItemService} from "../../../service/itemservice";
import {Itemstatus} from "../../../entity/itemstatus";
import {Category} from "../../../entity/category";
import {ItemStatusService} from "../../../service/itemstatusservice";
import {CategoryService} from "../../../service/categoryservice";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {BrandService} from "../../../service/brandservice";
import {SubcategoryService} from "../../../service/subcategoryservice";
import {UnittypeService} from "../../../service/unittypeservice";
import {Subcategory} from "../../../entity/Subcategory";
import {Brand} from "../../../entity/brand";

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
  public ssearch!: FormGroup;
  public form!: FormGroup;

  items: Array<Item> = [];
  data!: MatTableDataSource<Item>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  itemstauses: Array<Itemstatus> = [];
  categories: Array<Category> = [];
  subcategories: Array<Subcategory> = [];
  brands: Array<Brand> = [];

  uiassist: UiAssist;


  constructor(
    private fb:FormBuilder,
    private is:ItemService,
    private iss: ItemStatusService,
    private cts: CategoryService,
    private subcts: SubcategoryService,
    private brs: BrandService,
    private uns: UnittypeService,
    private dg: MatDialog
  ) {

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      'csname': new FormControl(),
      'cscode': new FormControl(),
      'csunittype': new FormControl(),
      'cssprice': new FormControl(),
      'cspprice': new FormControl(),
      'csmodi': new FormControl()
    });

    this.ssearch = this.fb.group({
      'ssname': new FormControl(),
      'ssitemstatus': new FormControl(),
      'sscategory': new FormControl()
    });

    this.form = this.fb.group({
      'category': new FormControl('', Validators.required),
      'subcategory': new FormControl('', Validators.required),
      'brand': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'code': new FormControl('', Validators.required),
      'unittype': new FormControl('', Validators.required),
      'pprice': new FormControl('', Validators.required),
      'sprice': new FormControl('', Validators.required),
      'photo': new FormControl(''),
      'quantity': new FormControl('', Validators.required),
      'rop': new FormControl('', Validators.required),
      'itemstatus': new FormControl('', Validators.required),
      'dointroduced': new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.createView();

    this.iss.getAllList().then((ists: Itemstatus[]) => {
      this.itemstauses = ists;
    });

    this.cts.getAllList().then((ctss: Category[]) => {
      this.categories = ctss;
    });

    this.filterSubcategories();
    this.filterBrands();
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

  btnSearchMc():void {
    const ssearchdata = this.ssearch.getRawValue();

    let name = ssearchdata.ssname;
    let categoryid = ssearchdata.sscategory;
    let itemstatusid = ssearchdata.ssitemstatus;

    let query:string = "";

    if (name != null && name.trim() != "") query = query + "&itemname=" + name;
    if (categoryid != null ) query = query + "&categoryid=" + categoryid;
    if (itemstatusid != null ) query = query + "&itemstatusid=" + itemstatusid;

    if (query != "") query = query.replace(/^./, '?');
    this.loadTable(query);
  }

  btnSearchClearMc(): void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.ssearch.reset();
        this.loadTable("");
      }
    });

  }

  filterSubcategories():void {
    this.form.get("category")?.valueChanges.subscribe((cat: Category) => {
      let qry = "?categoryid=" + cat.id;
      this.subcts.getAllList(qry).then((subs: Subcategory[]) => {
        this.subcategories = subs;
      });
    });
  }

  filterBrands():void {
    this.form.get("category")?.valueChanges.subscribe((cat: Category) => {
      let qry = "?categoryid=" + cat.id;
      this.brs.getAllList(qry).then((brands: Brand[]) => {
        this.brands = brands;
      });
    });
  }

}
