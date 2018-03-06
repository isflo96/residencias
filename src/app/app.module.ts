import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from "../pages/login/login";
import { DocumentsPage } from "../pages/documents/documents";

import { AngularFireModule, FirebaseApp } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { PdfmakeModule } from 'ng-pdf-make';
import { PdfmakeService } from "ng-pdf-make/pdfmake/pdfmake.service";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';

const firebaseConfig = {
  apiKey: "AIzaSyA1cHUFLr_jxPUmEDBtgi5vnY22SfGZS_k",
  authDomain: "residencias-ff31f.firebaseapp.com",
  databaseURL: "https://residencias-ff31f.firebaseio.com",
  projectId: "residencias-ff31f",
  storageBucket: "residencias-ff31f.appspot.com",
  messagingSenderId: "278362390817"
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DocumentsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,'residencias'),
    AngularFireDatabaseModule,
    PdfmakeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DocumentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseProvider,
    PdfmakeService
  ]
})
export class AppModule { }
