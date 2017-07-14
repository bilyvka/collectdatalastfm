import { Component } from '@angular/core';
import {CollectDataService} from "./services/collect-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private collectDataService:CollectDataService){
    let usernames = ["mxmu","iamhags"];
    this.getData(usernames,0,done=>{
         console.log("Done collecting data from all users");
    });

  }

  getData(usernames,index,callback){
    console.log(index);
    this.collectDataService.collectDataFromLastFm(usernames[index],done=>{

      if(index<usernames.length){
        index++;
        this.getData(usernames,index,callback);
      }
      else{
        callback();
      }
    });
  }


}
