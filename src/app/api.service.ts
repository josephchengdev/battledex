import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getPokemon(pokemonname : string){
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonname
    return this.httpClient.get(url)
  }

  public getSpecies(pokemonname : string){
    let url = 'https://pokeapi.co/api/v2/pokemon-species/' + pokemonname
    return this.httpClient.get(url)
  }

  public getMove(movename : string){
    movename = movename.toLowerCase().split(" ").join("-")
    let url = 'https://pokeapi.co/api/v2/move/' + movename
    return this.httpClient.get(url)
  }

  public getItem(itemname : string) {
    itemname = itemname.toLowerCase().split(" ").join("-")
    let url = 'https://pokeapi.co/api/v2/item/' + itemname
    return this.httpClient.get(url)
  }

  public getAbility(abilityname : string) {
    abilityname = abilityname.toLowerCase().split(" ").join("-")
    let url = 'https://pokeapi.co/api/v2/ability/' + abilityname
    return this.httpClient.get(url)
  }
}
