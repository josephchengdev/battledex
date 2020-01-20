import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnInit {
  input='';
  show = false;
  error = false;
  searched = false;
  movename;
  moveid;
  movepower;
  movepp;
  movepriority;
  moveaccuracy;
  moveclass;
  movetype;
  moveintroduction;
  moveeffectchance;
  moveeffect;
  movetarget;
  moveflavors;
  movestatchanges;
  movemeta;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  left() {
    this.input = String(this.moveid - 1)
    this.search()
  }

  right() {
    this.input = String(this.moveid + 1)
    this.search()
  }

  titleformat(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1).split("-").join(" ")
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
  }

  search() {
    this.searched = true;
    if (this.input) {
      this.apiService.getMove(this.input.toLowerCase()).subscribe((data)=>{
        this.show = true;
        this.error = false;
        this.movename = this.titleformat(data['name']);
        this.moveid = data['id'];
        this.movepower= data['power'];;
        this.movepp = data['pp'];
        this.movepriority = data['priority'];
        this.moveaccuracy = data['accuracy'];
        this.movetype = data['type']['name'];
        this.moveclass = data['damage_class']['name'];
        this.moveintroduction = data['generation']['name'];
        this.moveeffectchance = data['effect_chance'];
        this.moveeffect = data['effect_entries'][0]['effect'].split("$effect_chance").join(this.moveeffectchance);
        this.movetarget = data['target']['name'];
        this.moveflavors = data['flavor_text_entries'];
        this.movestatchanges = data['stat_changes'];
        this.movemeta = data['meta'];
      },
      err => {
        if (err.status == 404) {
          this.show = false;
          this.error = true;
        }
      });
    }
  }
}
