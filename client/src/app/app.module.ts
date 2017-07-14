import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LastFmService} from "./services/lastfm.service";
import {CollectDataService} from "./services/collect-data.service";
import {JsonService} from "./services/json-to-csv.service";
import {SaveDataService} from "./services/save-data.service";
import {HttpModule} from "@angular/http";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    LastFmService,
    CollectDataService,
    JsonService,
    SaveDataService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
