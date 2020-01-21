import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Router, ActivatedRoute } from "@angular/router";


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
  itemflavors;
  itemeffect;
  itemflingpower;
  itemflingeffect;
  itemheldbys;
  itemsprite;

  left() {
    this.input = String(this.itemid - 1)
    this.router.navigate(['/items', this.input.toLowerCase().split(' ').join('-')]);  }

  right() {
    this.input = String(this.itemid + 1)
    this.router.navigate(['/items', this.input.toLowerCase().split(' ').join('-')]);  }

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
    this.activatedRoute.params.subscribe((params) => {
      if (params['param']) {
        this.input = params['param'];
        this.search()
      }
    });
  }

  enter() {
    this.router.navigate(['/items', this.input.toLowerCase().split(' ').join('-')]);
  }

  search() {
    this.searched = true;
    this.show = false;
    this.error = false;
    this.loading = true;
    if (this.input) {
      this.apiService.getItem(this.input.toLowerCase()).subscribe((data)=>{
        this.itemname = this.titleformat(data['name']);
        this.itemid = data['id'];
        this.itemcost = (data['cost'] == 0 ? "Not Sold" : ("$" + (data['cost'])));
        this.itemattributes = data['attributes'];
        this.itemflavors = data['flavor_text_entries']
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
