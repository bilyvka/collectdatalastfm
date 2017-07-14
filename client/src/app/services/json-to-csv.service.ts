/**
 * Created by asoadmin on 2017-05-30.
 *
 * Implements transformation from Json to Csv format
 *
 */
import {Injectable} from "@angular/core";

import {Observable} from "rxjs/Observable";


@Injectable()
export class JsonService {

    public params = {del:',',quotes:'"', newLine:'\r\n', doubleQuotes:'""'};

    constructor () {

    }



    /**
     * Convert json array to csv records.
     * Nested fields should be specified by ".".
     * @param jsonArray - an array of json objects
     * @param fields - an array of field names that should be extracted from json
     * @param headers? =an array of string headers is optional
     * @returns {String} - csv data as string
     */

    public convertJsonToCSV(jsonArray,fields,headers){

        return Observable.create(observer =>{

            var result = [];
            var headersRow = '';

            if(headers){
                for(var i=0;i<headers.length;i++){
                    if (headersRow !== '') {
                        headersRow += this.params.del;
                    }

                    headersRow+= JSON.stringify(headers[i]).replace(/\"/g, this.params.quotes);
                }
                result.push(headersRow);
            }
            else{
                for(var i=0;i<fields.length;i++){
                    if (headersRow !== '') {
                        headersRow += this.params.del;
                    }
                    headersRow+= JSON.stringify(fields[i]).replace(/\"/g, this.params.quotes);
                }
                result.push(headersRow);
            }



            //create collumns data

            for(let i =0;i<jsonArray.length;i++){
                let record = [];
                let line = '';
                for (let j =0;j<fields.length;j++){

                    //alert(fields[j])
                    if(fields[j].indexOf(".") != -1){
                        //alert(fields[j])

                        let nested_fields = fields[j].split(".");

                        this.traverse_it(jsonArray[i],nested_fields,0,(error,value):void=>{

                            let stringifiedElement = JSON.stringify(value);

                            stringifiedElement = stringifiedElement.replace(/\\\\/g, '\\');
                            line+=stringifiedElement;
                            line+=this.params.del;

                            //record.push(stringifiedElement);
                        });

                    }
                    else{

                        let stringifiedElement = JSON.stringify(jsonArray[i][fields[j]]);
                        stringifiedElement = stringifiedElement.replace(/\\\\/g, '\\');
                        line+=stringifiedElement;
                        line+=this.params.del;

                        //record.push(stringifiedElement);
                    }

                }
                //var row = record.join(",");
                //remove last delimeter

                line = line.substring(0, line.length - 1);



                //Replace single quotes with double quotes. Single quotes are preceeded by
                //a backslash. Be careful not to remove backslash content from the string.
                line = line.split('\\\\').map((portion)=> {
                    return portion.replace(/\\"/g, this.params.doubleQuotes);
                }).join('\\\\');

                //Remove the final excess backslashes from the stringified value.
                line = line.replace(/\\\\/g, '\\');
                result.push(line);


            }
            let csvString = result.join(this.params.newLine);


            observer.next(csvString);
            observer.complete();
        })

    }


    public getCSV(jsonArray,fields,headers,callback){
        var result = [];
        var headersRow = '';

        if(headers){
            for(var i=0;i<headers.length;i++){
                if (headersRow !== '') {
                    headersRow += this.params.del;
                }

                headersRow+= JSON.stringify(headers[i]).replace(/\"/g, this.params.quotes);
            }
            result.push(headersRow);
        }
        else{
            for(var i=0;i<fields.length;i++){
                if (headersRow !== '') {
                    headersRow += this.params.del;
                }
                headersRow+= JSON.stringify(fields[i]).replace(/\"/g, this.params.quotes);
            }
            result.push(headersRow);
        }



        //create collumns data

        for(var i =0;i<jsonArray.length;i++){
            var record = [];
            var line = '';
            for (var j =0;j<fields.length;j++){

                //alert(fields[j])
                if(fields[j].indexOf(".") != -1){
                    //alert(fields[j])

                    var nested_fields = fields[j].split(".");

                    this.traverse_it(jsonArray[i],nested_fields,0,(error,value):void=>{

                        var stringifiedElement = JSON.stringify(value);
                        stringifiedElement = stringifiedElement.replace(/\\\\/g, '\\');
                        line+=stringifiedElement;
                        line+=this.params.del;

                        //record.push(stringifiedElement);
                    });

                }
                else{

                    var stringifiedElement = JSON.stringify(jsonArray[i][fields[j]]);
                    stringifiedElement = stringifiedElement.replace(/\\\\/g, '\\');
                    line+=stringifiedElement;
                    line+=this.params.del;

                    //record.push(stringifiedElement);
                }

            }
            //var row = record.join(",");
            //remove last delimeter

            line = line.substring(0, line.length - 1);



            //Replace single quotes with double quotes. Single quotes are preceeded by
            //a backslash. Be careful not to remove backslash content from the string.
            line = line.split('\\\\').map((portion)=> {
                return portion.replace(/\\"/g, this.params.doubleQuotes);
            }).join('\\\\');

            //Remove the final excess backslashes from the stringified value.
            line = line.replace(/\\\\/g, '\\');

            result.push(line);


        }
        let csvString = result.join(this.params.newLine);
        callback(csvString);

    }

    private traverse_it(obj,properties,index,callback:ICallback):void{



            if(obj[properties[index]]){
                if(typeof obj[properties[index]]=='object'){
                    // object
                    var next_obj = obj[properties[index]];
                    index++;
                    this.traverse_it(next_obj,properties,index,callback);
                }
                else{

                    callback(null,obj[properties[index]]);
                }
            }
            else{

                callback(null,"");
            }


    }

}

interface ICallback {
    ( error: Error, result?: any ) : void;
}
