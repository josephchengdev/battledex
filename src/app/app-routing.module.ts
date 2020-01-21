import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { HomeComponent } from  './home/home.component';
import { MovesComponent } from './moves/moves.component'
import { ItemsComponent } from './items/items.component'
import { AbilitiesComponent } from './abilities/abilities.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'pokemon/:param', component: PokemonComponent },
  { path: 'moves', component: MovesComponent },
  { path: 'moves/:param', component: MovesComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'items/:param', component: ItemsComponent },
  { path: 'abilities', component: AbilitiesComponent },
  { path: 'abilities/:param', component: AbilitiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }