import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from "@angular/router";
import { HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  input = '';
  pokemonname;
  pokemonid;
  pokemonheight;
  pokemonweight;
  pokemontypes;
  pokemonabilities;
  pokemonmoves;
  pokemonsprites;
  pokemonstats;
  pokemonappearances;
  pokemonbaseexperience;
  pokemongeneration;
  pokemoncapturerate;
  pokemonegggroups;
  pokemonhabitat;
  pokemonevolvesfrom;
  pokemoncolor;
  pokemonshape;
  pokemondescriptions;
  pokemonevolutionchain;
  pokemonhelditems;
  show = false;
  error = false;
  searched = false;
  loading = false;
  focus = false;

  options;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.apiService.getAllPokemon().subscribe((allPokemon: String[])=>{
      this.options = allPokemon; 
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
    this.router.navigate(['/pokemon', String(this.pokemonid - 1)]);
  }

  right() {
    this.router.navigate(['/pokemon', String(this.pokemonid + 1)]);
  }

  enter() {
    this.router.navigate(['/pokemon', this.myControl.value.toLowerCase().split(" ").join("-")]);
  }

  titleformat(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1).split("-").join(" ")
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
  }
  
  datamapping(data: Object, moredata: Object) {
    this.pokemonid = data['id'];
    this.pokemonname = (this.pokemonname.charAt(0).toUpperCase() + this.pokemonname.slice(1).split("-").join(" "))
    this.pokemonname = this.pokemonname.split(" ");
    for (var i = 0, x = this.pokemonname.length; i < x; i++) {
      this.pokemonname[i] = this.pokemonname[i][0].toUpperCase() + this.pokemonname[i].substr(1);
    }
    this.pokemonname = this.pokemonname.join(" ");
    this.pokemonheight = data['height']
    this.pokemonweight = data['weight']
    this.pokemontypes = data['types']
    this.pokemonabilities = data['abilities']
    this.pokemonbaseexperience = data['base_experience']
    this.pokemonmoves = data['moves']
    this.pokemonmoves = this.pokemonmoves.sort((n1,n2) => {
        if (n1.move.name > n2.move.name) {
            return 1;
        }
    
        if (n1.move.name < n2.move.name) {
            return -1;
        }
    
        return 0;
    });
    this.pokemonsprites = data['sprites']
    this.pokemonstats = data['stats']
    this.pokemonappearances = data['game_indices']
    this.pokemonhelditems = data['held_items']
    this.pokemongeneration = moredata['generation']
    this.pokemoncapturerate = moredata['capture_rate']
    this.pokemonegggroups = moredata['egg_groups']
    this.pokemonhabitat = moredata['habitat']
    this.pokemonevolvesfrom = moredata['evolves_from_species']
    this.pokemoncolor = moredata['color']
    this.pokemonshape = moredata['shape']
    for (var i = 0, x = moredata['flavor_text_entries'].length; i < x; i++) {
      if (moredata['flavor_text_entries'][i]['language']['name'] == 'en') {
        this.pokemondescriptions = moredata['flavor_text_entries'][i]['flavor_text']
      }
    }
    this.pokemonevolutionchain = moredata['evolution_chain']
    this.loading = false;
    this.show = true;
    this.error = false;
  }

  searchfail() {
    this.loading = false;
    this.show = false;
    this.error = true;
  }

  search() {
    this.searched = true;
    this.show = false;
    this.error = false;
    this.loading = true;
    this.apiService.getPokemon(this.input.toLowerCase()).subscribe((data)=>{
      this.pokemonname = data['name'];
      this.myControl.setValue(this.titleformat(this.pokemonname))
      let baseforme = this.pokemonname.split("-")[0]; 
      this.apiService.getSpecies(baseforme).subscribe((moredata)=>{
        this.datamapping(data, moredata);
      },
      err => {
        if (err.status == 404) {
          this.apiService.getSpecies(this.input.toLowerCase()).subscribe((moredata)=>{
            this.datamapping(data, moredata);
          },
          err => {
            if (err.status == 404) {
              this.searchfail();
            }
          });
        }
      });
    },
    err => {
      if (err.status == 404) {
        this.searchfail();
      }
    });
  }

}
