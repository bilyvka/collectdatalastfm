/**
 * Created by asoadmin on 2017-05-26.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/expand';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/**
 * Implements access to Lastfm API
 * author:Alisa,Stefan
 */
@Injectable()
export class LastFmService {

    private API_KEY="d988493833cddc64c24aef79f75cafaa";

    constructor (public _http: Http) {

    }

    /**
     * Recursive function to retrieve all recently played songs with delta approach
     * @param timestampFrom - from a certain time
     * @param timestampTo - to a certain time
     * @param page - a starting page number
     */
    public getRecentlyPlayedSongs(username,page,timestampFrom?){

        //api call
        const getData = (page):Observable<any>=>{


            var lastfmURL = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+username+"&limit=1000&page="+page+"&api_key="+this.API_KEY+"&format=json";
            if(timestampFrom != null){
                lastfmURL =  "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+username+"&from="+timestampFrom+"&limit=1000&page="+page+"&api_key="+this.API_KEY+"&format=json";

            }
            return this._http.get(lastfmURL)
                .map( (result) =>  {return {result:result.json(),currentPage:page}}).catch((error)=> {

                    return Observable.throw(error.json())
                });
        };

        return getData(page).expand((result)=>{

            //result.result.recenttracks['@attr'].totalPages

            if(result.currentPage<result.result.recenttracks['@attr'].totalPages){
                page++;
                return getData(page);
            }
            else{

                return Observable.empty();
            }


        }).map(res => res);

    }

}







