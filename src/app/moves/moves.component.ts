import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Router, ActivatedRoute } from "@angular/router";
import { HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  loading = false;
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
  focus = false;

  options;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.apiService.getAllMoves().subscribe((allMoves: String[])=>{
      this.options = allMoves; 
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

  left() {
    this.router.navigate(['/moves', String(this.moveid - 1)]);
  }

  right() {
    this.router.navigate(['/moves', String(this.moveid + 1)]);
  }

  enter() {
    this.router.navigate(['/moves', this.myControl.value.toLowerCase().split(" ").join("-")]);
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
    this.show = false;
    this.error = false;
    this.loading = true;
    if (this.input) {
      this.apiService.getMove(this.input.toLowerCase()).subscribe((data)=>{
        this.movename = this.titleformat(data['name']);
        this.myControl.setValue(this.titleformat(this.movename))
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
