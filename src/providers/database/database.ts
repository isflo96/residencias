//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { cat_users,cat_business,cat_encargados } from "../../local/data/database";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  results: AngularFireList<any>;
  database: any;
  ref: any;

  constructor(
    //public http: HttpClient,
    public fireData: AngularFireDatabase
  ) {
    this.database = fireData.database.ref();
  }

  validateUser(iv_user, iv_pass) {
    /*
    console.log(iv_user);
    var result = false;
    this.database.child("cat_users").on("value", function (snapshot) {
      var value = snapshot.val();
      snapshot.forEach(element => {
        var key = element.key;
        if (value[key].user != iv_user && result != true) {
        }else{
          if (value[key].pass != iv_pass && result != true) {
          }else{
            result = true;
          }
        }
      });
    });
    */
    console.log(iv_user);
    var result = false;
    cat_users.forEach(element => {
      if (element.user != iv_user && result != true) {
      } else {
        if (element.pass != iv_pass && result != true) {
        } else {
          result = true;
        }
      }
    });
    return result;
  }

  getEmpresa(){
    return cat_business;
  }

  getDir(iv_empresa){
    var result = "";
    var ok = false;
    cat_business.forEach(element => {
      if (element.id == iv_empresa && ok != true) {
        ok = true;
        result = element.dir;
      }
    });
    return result;
  }

  getEncargado(iv_empresa){
    var result = [];
    cat_encargados.forEach(element => {
      if (element.empresa == iv_empresa) {
        result.push(element);
      }
    });
    return result;
  }
}
