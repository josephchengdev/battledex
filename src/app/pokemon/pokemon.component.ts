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
  displayedColumns: string[] = ['move', 'method', 'level'];
  dataSource = this.pokemonappearances;
  show = false;
  error = false;
  searched = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  hi() {}
  search() {
    this.searched = true;
    if (this.input) {
      this.apiService.getPokemon(this.input.toLowerCase()).subscribe((data)=>{
        this.show = true;
        this.error = false;
        this.pokemonname = data['name'];
        this.pokemonid = data['id'];
        this.pokemonheight = data['height']
        this.pokemonweight = data['weight']
        this.pokemontypes = data['types']
        this.pokemonabilities = data['abilities']
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
        this.dataSource = this.pokemonappearances;
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
