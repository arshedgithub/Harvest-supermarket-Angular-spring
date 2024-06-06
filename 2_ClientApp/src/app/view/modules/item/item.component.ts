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
import {Unittype} from "../../../entity/unittype";
import {RegexService} from "../../../service/regexservice";
import {DatePipe} from "@angular/common";

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
  imageitmurl: string = 'assets/default.png';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  itemstauses: Array<Itemstatus> = [];
  categories: Array<Category> = [];
  subcategories: Array<Subcategory> = [];
  brands: Array<Brand> = [];
  unittypes: Array<Unittype> = [];

  regexes!: any;
  uiassist: UiAssist;
  col!: { [p: string]: any; }

  constructor(
    private fb:FormBuilder,
    private is:ItemService,
    private iss: ItemStatusService,
    private cts: CategoryService,
    private subcts: SubcategoryService,
    private brs: BrandService,
    private uns: UnittypeService,
    private rxs: RegexService,
    private dg: MatDialog,
    private dp: DatePipe
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

    this.uns.getAllList().then((units: Category[]) => {
      this.unittypes = units;
    });

    this.rxs.get("item").then((regexs: []) => {
      this.regexes = regexs;
      this.createForm();
    });

    this.filterSubcategories();
    this.filterBrands();
    this.getItemName();
    this.changeRadioColor();

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  createForm() {

    this.form.controls['category'].setValidators([Validators.required]);
    this.form.controls['subcategory'].setValidators([Validators.required]);
    this.form.controls['brand'].setValidators([Validators.required]);
    this.form.controls['name'].setValidators([Validators.required, Validators.pattern(this.regexes['name']['regex'])]);
    this.form.controls['code'].setValidators([Validators.required, Validators.pattern(this.regexes['code']['regex'])]);
    this.form.controls['unittype'].setValidators([Validators.required]);
    this.form.controls['pprice'].setValidators([Validators.required, Validators.pattern(this.regexes['pprice']['regex'])]);
    this.form.controls['sprice'].setValidators([Validators.required, Validators.pattern(this.regexes['sprice']['regex'])]);
    this.form.controls['mobile'].setValidators([Validators.required, Validators.pattern(this.regexes['mobile']['regex'])]);
    this.form.controls['photo'];
    this.form.controls['quantity'].setValidators([Validators.required,Validators.pattern(this.regexes['quantity']['regex'])]);
    this.form.controls['rop'].setValidators([Validators.required,Validators.pattern(this.regexes['rop']['regex'])]);
    this.form.controls['itemstatus'].setValidators([Validators.required]);
    this.form.controls['dointroduced'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    // for (const controlName in this.form.controls) {
    //   const control = this.form.controls[controlName];
    //   control.valueChanges.subscribe(value => {
    //       // @ts-ignore
    //       if (controlName == "dobirth" || controlName == "doassignment")
    //         value = this.dp.transform(new Date(value), 'yyyy-MM-dd');
    //
    //       if (this.oldemployee != undefined && control.valid) {
    //         // @ts-ignore
    //         if (value === this.employee[controlName]) {
    //           control.markAsPristine();
    //         } else {
    //           control.markAsDirty();
    //         }
    //       } else {
    //         control.markAsPristine();
    //       }
    //     }
    //   );
    // }

    // this.enableButtons(true,false,false);
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

  getItemName(): void {
    this.form.get("brand")?.valueChanges.subscribe((brand: Brand) => {
      let subcategory = this.form.get("subcategory")?.value;
      let itemname = brand.name + " " + subcategory.name;
      this.form.get("name")?.setValue(itemname);
    });
  }

  changeRadioColor(): void {
    this.form.get("unittype")?.valueChanges.subscribe(() => {
      let sts = this.form.get("unittype")?.invalid;
      if (!sts) this.col = {"border" : "1px solid gray"}
      else this.col = {"border" : "1px solid #e15959"}
    });
  }

  selectImage(e: any): void {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageitmurl = event.target.result;
        this.form.controls['photo'].clearValidators();
      }
    }
  }

  clearImage(): void {
    this.imageitmurl = 'assets/default.png';
    this.form.controls['photo'].setErrors({'required': true});
  }

}
