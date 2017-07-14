/**
 * Created by asoadmin on 2017-06-06.
 */
/**
 * Implements access to Lastfm API
 * author:Alisa,Stefan
 */

import {Injectable} from "@angular/core";
import {LastFmService} from "./lastfm.service";
import {SaveDataService} from "./save-data.service";
import {JsonService} from "./json-to-csv.service";




@Injectable()
export class CollectDataService {


  constructor(private jsonService: JsonService, private sendDataService: SaveDataService, private lastFmService: LastFmService) {

  }

  /******LAST FM START******/
  /**
   *
   * @param startTimestamp [optional] - is UNIX time in milliseconds
   */
  collectDataFromLastFm(username, callback,startTimestamp?) {

    let tracks = [];
    if (startTimestamp === null || startTimestamp === "undefind") {

      //collect all data
      this.lastFmService.getRecentlyPlayedSongs(username, 1).subscribe((result) => {


        if (result.result.recenttracks.track.length > 0) {
          tracks.push.apply(tracks, result.result.recenttracks.track);

        }

      }, err => {
        console.log("Errro: " + err);
      }, () => {
        //this is the end of recursion
        console.log("Total songs: " + tracks.length);
        //convert data to SCV
        this.jsonService.convertJsonToCSV(tracks, ["name", "mbid", "streamable", "artist.#text", "artist.mbid", "album.#text", "album.mbid", "url", "image.0.#text", "image.1.#text", "image.2.#text", "image.3.#text", "date.uts"], ["name", "mbid", "streamable", "artist_name", "artist_mbid", "album_name", "album_mbid", "url", "image_small", "image_medium", "image_large", "image_extra", "date"]).subscribe((csvdata) => {
          //save data to file and send to the server
          this.sendDataService.sendDataToServer(csvdata, "lastfm", "recent-songs",username,done=>{
            callback();//done
          });
        });

      })
    }
    else {
      //collect data from a certain date

      this.lastFmService.getRecentlyPlayedSongs(username, 1, startTimestamp).subscribe((result) => {
        if (result.result.recenttracks.track.length > 0) {
          tracks.push.apply(tracks, result.result.recenttracks.track);
        }

      }, err => {

      }, () => {
        //this is the end of recursion

        console.log("Total songs: " + tracks.length);
        //convert data to SCV
        this.jsonService.convertJsonToCSV(tracks, ["name", "mbid", "streamable", "artist.#text", "artist.mbid", "album.#text", "album.mbid", "url", "image.0.#text", "image.1.#text", "image.2.#text", "image.3.#text", "date.uts"], ["name", "mbid", "streamable", "artist_name", "artist_mbid", "album_name", "album_mbid", "url", "image_small", "image_medium", "image_large", "image_extra", "date"]).subscribe((csvdata) => {
          //save data to file and send to the server
          this.sendDataService.sendDataToServer(csvdata, "lastfm", "recent-songs",username,done=>{
            callback();
          });
        });
      })
    }

  }

  /******LAST FM END******/

}







