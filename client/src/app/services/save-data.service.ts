/**
 * Created by asoadmin on 2017-05-30.
 * Implements sending the CSV data to an external server
 */
import {Injectable} from "@angular/core";
import {Http,RequestOptions,Headers} from "@angular/http";

@Injectable()
export class SaveDataService {

    private serverURL = "http://localhost:3000"; //where to send the data


    constructor(private http:Http) {

    }

    /**
     * Creates a csv file in the folder data
     * @param csvData
     * @param apiType
     * @param method
     */
    public sendDataToServer(csvData: string, apiType: string, method: string, username:string,callback) {

        let clientTimeStamp = new Date().getTime();
        let filename = username + "_" + apiType + "_" + method + "_" + clientTimeStamp + ".csv";


        //send data in csv format to nodejs server

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.serverURL + "/data", {"data": csvData,"filename":filename}, options)
          .map(res => {
            //console.log(res);
            callback();//done
          })
          .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('done')
          );

    }
}
