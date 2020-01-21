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
  { path: 'moves', component: MovesComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'abilities', component: AbilitiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }