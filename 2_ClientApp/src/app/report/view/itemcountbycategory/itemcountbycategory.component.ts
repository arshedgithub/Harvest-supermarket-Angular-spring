import {Component, ViewChild} from '@angular/core';
import {CountByDesignation} from "../../entity/countbydesignation";
import {MatTableDataSource} from "@angular/material/table";
import {ReportService} from "../../reportservice";
import {CountByCategory} from "../../entity/countbycategory";

declare var google: any;

@Component({
  selector: 'app-itemcountbycategory',
  templateUrl: './itemcountbycategory.component.html',
  styleUrls: ['./itemcountbycategory.component.css']
})
export class ItemcountbycategoryComponent {
  countbyCategories!: CountByCategory[];
  data!: MatTableDataSource<CountByCategory>;

  columns: string[] = ['designation', 'count'];
  headers: string[] = ['Designation', 'Count'];
  binders: string[] = ['designation', 'count'];

  @ViewChild('barchart', { static: false }) barchart: any;
  @ViewChild('piechart', { static: false }) piechart: any;
  @ViewChild('linechart', { static: false }) linechart: any;

  constructor(private rs: ReportService) {
    //Define Interactive Panel with Needed Form Elements
  }

  ngOnInit(): void {

    this.rs.itemCountByCategory()
      .then((cts: CountByCategory[]) => {
        this.countbyCategories = cts;
      }).finally(() => {
      this.loadTable();
      this.loadCharts();
    });

  }

  loadTable() : void{
    this.data = new MatTableDataSource(this.countbyCategories);
  }

  loadCharts() : void{
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawCharts.bind(this));
  }

  drawCharts() {

    const barData = new google.visualization.DataTable();
    barData.addColumn('string', 'Category');
    barData.addColumn('number', 'Count');

    const pieData = new google.visualization.DataTable();
    pieData.addColumn('string', 'Category');
    pieData.addColumn('number', 'Count');

    const lineData = new google.visualization.DataTable();
    lineData.addColumn('string', 'Category');
    lineData.addColumn('number', 'Count');

    this.countbyCategories.forEach((cat: CountByCategory) => {
      barData.addRow([cat.name, cat.count]);
      pieData.addRow([cat.name, cat.count]);
      lineData.addRow([cat.name, cat.count]);
    });

    const barOptions = {
      title: 'Designation Count (Bar Chart)',
      subtitle: 'Count of Items By Category',
      bars: 'horizontal',
      height: 400,
      width: 600
    };

    const pieOptions = {
      title: 'Designation Count (Pie Chart)',
      height: 400,
      width: 550
    };

    const lineOptions = {
      title: 'Designation Count (Line Chart)',
      height: 400,
      width: 600
    };

    const barChart = new google.visualization.BarChart(this.barchart.nativeElement);
    barChart.draw(barData, barOptions);

    const pieChart = new google.visualization.PieChart(this.piechart.nativeElement);
    pieChart.draw(pieData, pieOptions);

    const lineChart = new google.visualization.LineChart(this.linechart.nativeElement);
    lineChart.draw(lineData, lineOptions);
  }
}
