import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';

/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {

  //Variables de Datos
  vg_matricula = "";
  vg_ap_pat = "";
  vg_ap_mat = "";
  vg_nombres = "";
  vg_empresa = "";
  vg_direccion = "";
  vg_encargado = "";
  vg_proy_name = "";


  vg_empresas = [];
  vg_encargados = [];

  //Variable PDF
  pdfObj = null;
  docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProv: DatabaseProvider,
    private pdfmake: PdfmakeService,
    private plt: Platform,
    private file: File, 
    private fileOpener: FileOpener
  ) {
    this.vg_empresas = dataProv.getEmpresa();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
  }

  getDir() {
    this.vg_direccion = this.dataProv.getDir(this.vg_empresa);
    this.vg_encargados = this.dataProv.getEncargado(this.vg_empresa);
    console.log(this.vg_encargados)
  }

  getPDF() {
    this.pdfObj = pdfMake.createPdf(this.docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

}
