import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { PokemonComponent } from './pokemon/pokemon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material'
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';;
import { HomeComponent } from './home/home.component';
import { MovesComponent } from './moves/moves.component';
import { ItemsComponent } from './items/items.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlexLayoutModule } from "@angular/flex-layout";



@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    HomeComponent,
    MovesComponent,
    ItemsComponent,
    AbilitiesComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDividerModule,
    MatTabsModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
