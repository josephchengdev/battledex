import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  titleformat(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1).split("-").join(" ")
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
  }

  public getPokemon(pokemonname : string){
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonname
    return this.httpClient.get(url)
  }

  public getAllPokemon(): Observable<String[]>{
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=1200'
    let allpokemon = []
    return this.httpClient.get(url)
      .pipe(
        map((data: any) => {
          for(let pokemon of data['results']) {
            allpokemon.push(this.titleformat(pokemon['name']));
          }
          allpokemon.sort();
          return allpokemon;
        })
      );
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

  public getAllMoves(): Observable<String[]>{
    let url = 'https://pokeapi.co/api/v2/move/?limit=1200'
    let allmoves = []
    return this.httpClient.get(url)
      .pipe(
        map((data: any) => {
          for(let move of data['results']) {
            allmoves.push(this.titleformat(move['name']));
          }
          allmoves.sort();
          return allmoves;
        })
      );
  }

  public getItem(itemname : string) {
    itemname = itemname.toLowerCase().split(" ").join("-")
    let url = 'https://pokeapi.co/api/v2/item/' + itemname
    return this.httpClient.get(url)
  }

  public getAllItems(): Observable<String[]>{
    let url = 'https://pokeapi.co/api/v2/item/?limit=1200'
    let allitems = []
    return this.httpClient.get(url)
      .pipe(
        map((data: any) => {
          for(let item of data['results']) {
            allitems.push(this.titleformat(item['name']));
          }
          allitems.sort();
          return allitems;
        })
      );
  }

  public getAbility(abilityname : string) {
    abilityname = abilityname.toLowerCase().split(" ").join("-")
    let url = 'https://pokeapi.co/api/v2/ability/' + abilityname
    return this.httpClient.get(url)
  }

  public getAllAbilities(): Observable<String[]>{
    let url = 'https://pokeapi.co/api/v2/ability/?offset=20&limit=1200'
    let allabilities = []
    return this.httpClient.get(url)
      .pipe(
        map((data: any) => {
          for(let ability of data['results']) {
            allabilities.push(this.titleformat(ability['name']));
          }
          allabilities.sort();
          return allabilities;
        })
      );
  }
}
