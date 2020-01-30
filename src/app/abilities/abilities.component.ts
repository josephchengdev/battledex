import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from "@angular/router";
import { HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  loading = false;
  abilityid;
  abilityname;
  abilitymainseries;
  abilitygeneration;
  abilityeffect;
  abilityflavors;
  abilitypokemon;
  focus = false;

  options;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.apiService.getAllAbilities().subscribe((allAbilities: String[])=>{
      this.options = allAbilities; 
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

  left() {
    this.router.navigate(['/abilities', String(this.abilityid - 1)]);
  }

  right() {
    this.router.navigate(['/abilities', String(this.abilityid + 1)]);
  }

  enter() {
    this.router.navigate(['/abilities', this.myControl.value.toLowerCase().split(" ").join("-")]);
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
      this.apiService.getAbility(this.input.toLowerCase()).subscribe((data)=>{
        this.abilityname = this.titleformat(data['name']);
        this.myControl.setValue(this.titleformat(this.abilityname))
        this.abilityid = data['id'];
        this.abilityflavors = data['flavor_text_entries'];
        if(data['effect_entries'].length > 0){
          this.abilityeffect = data['effect_entries'][0]['effect']
        }
        else {
          this.abilityeffect = 'None'
        }
        // console.log(this.abilityflavors)
        this.abilitygeneration = data['generation']['name'].charAt(0).toUpperCase() + data['generation']['name'].slice(1).split("-").join(" ");
        this.abilitypokemon = data['pokemon'];
        this.abilitypokemon = this.abilitypokemon.sort((n1,n2) => {
          if (n1.pokemon.name > n2.pokemon.name) {
              return 1;
          }
      
          if (n1.pokemon.name < n2.pokemon.name) {
              return -1;
          }
      
          return 0;
      });
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
