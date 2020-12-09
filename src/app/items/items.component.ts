import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Router, ActivatedRoute } from "@angular/router";
import { HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  input='';
  show = false;
  error = false;
  searched = false;
  loading = false;
  itemname;
  itemid;
  itemcost;
  itemcategory;
  itemattributes;
  itemflavor;
  itemeffect;
  itemflingpower;
  itemflingeffect;
  itemheldbys;
  itemsprite;
  focus = false;

  options;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  left() {
    this.router.navigate(['/items', String(this.itemid - 1)]);
  }

  right() {
    this.router.navigate(['/items', String(this.itemid + 1)]);
  }

  enter() {
    this.router.navigate(['/items', this.myControl.value.toLowerCase().split(" ").join("-")]);
  }

  titleformat(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1).split("-").join(" ")
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
  }

  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.apiService.getAllItems().subscribe((allItems: String[])=>{
      this.options = allItems; 
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params['param']) {
        this.input = params['param'];
        this.search()
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (!this.error && this.searched && !this.focus) {
      if ((event.key == "Right") || (event.key == "ArrowRight")) {
        this.right()
      }
      if ((event.key == "Left") || (event.key == "ArrowLeft")) {
        this.left()
      }
    }
  }

  onFocus() {
    this.focus = true
  }

  onBlur() {
    this.focus = false
  }

  search() {
    this.searched = true;
    this.show = false;
    this.error = false;
    this.loading = true;
    if (this.input) {
      this.apiService.getItem(this.input.toLowerCase()).subscribe((data)=>{
        this.itemname = this.titleformat(data['name']);
        this.myControl.setValue(this.titleformat(this.itemname))
        this.itemid = data['id'];
        this.itemcost = (data['cost'] == 0 ? "Not Sold" : ("$" + (data['cost'])));
        this.itemattributes = data['attributes'];
        for (var i = 0, x = data['flavor_text_entries'].length; i < x; i++) {
          if (data['flavor_text_entries'][i]['language']['name'] == 'en') {
            this.itemflavor = data['flavor_text_entries'][i]['text'];
          }
        }
        this.itemeffect = data['effect_entries'][0]['effect']
        this.itemcategory = data['category']['name']
        this.itemflingeffect = (data['fling_effect'] ? this.titleformat(data['fling_effect']['name']) : "None");
        this.itemflingpower = (data['fling_power'] ? data['fling_power'] : "NA");
        this.itemheldbys = data['held_by_pokemon'];
        this.itemsprite = data['sprites']['default']
        this.loading = false;
        this.show = true;
        this.error = false;
      },
      err => {
        if (err.status == 404) {
          this.loading = false;
          this.show = false;
          this.error = true;
        }
      });
    }
  }

}
