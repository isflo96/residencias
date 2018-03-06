import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DocumentsPage } from '../documents/documents';
import { DatabaseProvider } from "../../providers/database/database";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  vg_user: string;
  vg_pass: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProv: DatabaseProvider,
    public toastCtrl: ToastController
  ) {
    this.vg_user = "limon"
    this.vg_pass = "123456"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  toDocs() {
    if (this.presentToast(this.dataProv.validateUser(this.vg_user, this.vg_pass))) {
      this.navCtrl.push(DocumentsPage);
    }
  }

  presentToast(iv_option) {
    var toast;
    if (iv_option) {
      toast = this.toastCtrl.create({
        message: 'User was added successfully',
        duration: 3000
      });
    } else {
      toast = this.toastCtrl.create({
        message: 'Error occurred on Login',
        duration: 3000
      });
    }
    toast.present();

    return iv_option;
  }

}
