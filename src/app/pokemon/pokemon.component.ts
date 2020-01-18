import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

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
  show = false;
  error = false;
  searched = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  left() {
    this.input = String(this.pokemonid - 1)
    this.search()
  }

  right() {
    this.input = String(this.pokemonid + 1)
    this.search()
  }
  search() {
    this.searched = true;
    if (this.input) {
      this.apiService.getPokemon(this.input.toLowerCase()).subscribe((data)=>{
        this.apiService.getSpecies(this.input.toLowerCase()).subscribe((moredata)=>{
          this.show = true;
          this.error = false;
          this.pokemonname = data['name'];
          this.pokemonid = data['id'];
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
          this.pokemongeneration = moredata['generation']
          this.pokemoncapturerate = moredata['capture_rate']
          this.pokemonegggroups = moredata['egg_groups']
          this.pokemonhabitat = moredata['habitat']
          this.pokemonevolvesfrom = moredata['evolves_from_species']
          this.pokemoncolor = moredata['color']
          this.pokemonshape = moredata['shape']
          this.pokemondescriptions = moredata['flavor_text_entries']
          this.pokemonevolutionchain = moredata['evolution_chain']
        });
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
