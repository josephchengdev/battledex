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
}
