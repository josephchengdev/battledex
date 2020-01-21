import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements OnInit {
  input='';
  show = false;
  error = false;
  searched = false;
  abilityid;
  abilityname;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  left() {
    this.input = String(this.abilityid - 1)
    this.search()
  }

  right() {
    this.input = String(this.abilityid + 1)
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
      this.apiService.getAbility(this.input.toLowerCase()).subscribe((data)=>{
        this.show = true;
        this.error = false;
        this.abilityname = this.titleformat(data['name']);
        this.abilityid = data['id'];
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
