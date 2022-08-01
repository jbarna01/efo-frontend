import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MunkaorakRogzitesePanelComponent} from "../../munkaorak-rogzitese-panel/munkaorak-rogzitese-panel.component";
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  FoglalkoztatasAdatokControllerService,
  MunkaltatoReszlegControllerService,
  MunkavallaloiRogzitettAdatokDTO
} from "../../../../../build/openapi/efo";
import {ComponentBase} from "../../../common/utils/component-base";
import {MegerrositesDialogComponent} from "../../../dialogs/megerrosites-dialog/megerrosites-dialog.component";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-orak-rogzitese',
  templateUrl: './orak-rogzitese.component.html',
  styleUrls: ['./orak-rogzitese.component.css']
})
export class OrakRogziteseComponent extends ComponentBase implements OnInit {

  isInaktivGomb = false;
  fejlecCime = '';

  id: number;
  navAdatokFk: number;
  munkanapDatuma: Date;
  munkaidoKezdete: string = '';
  munkaidoVege: string = '';
  munkaorakSzama: string = '';
  teljesMunkaidoPercekben: number = 0;
  normalMunkaorakSzama: string = '';
  normalMunkaidoPercekben: number = 0;
  tuloraMunkaorakSzama: string = '';
  tuloraMunkaidoPercekben: number = 0;
  tuloraMunkaidoKezdete: string = '';
  tuloraMunkaidoVege: string = '';
  ejszakaiMunkaorakSzama: string = '';
  ejszakaiMunkaidoPercekben: number = 0;
  ejszakaiMunkaidoKezdete: string = '';
  ejszakaiMunkaidoVege: string = '';
  unnepnapiMunkaorakSzama: string = '';
  munkanapokSzama: number = 1;
  munkavallaloiRogzitettAdatok: MunkavallaloiRogzitettAdatokDTO;

  oradij: number = 0;

  napidijOsszeg: number = 0;
  tuloraDij: number = 0;
  tuloraDijOsszeg: number = 0;
  ejszakaiPotlek: number = 0;
  ejszakaiPotlekOsszeg: number = 0;
  unnepnapiPotlek: number = 0;
  unnepnapiPotlekOsszeg: number = 0;
  osszesen: number = 0;
  szervezetKod: string;
  munkaszunetinap: boolean = false;
  szakkepzetsegetIgenyel: boolean = false;

  kivalasztottReszlegId: number = null;
  kivalasztottReszlegNev: string = null;
  hibakLathato: boolean = false;
  munkaidoError1: string;
  munkaidoError2: string;
  munkaidoError3: string;
  munkaidoError4: string;


  rogzitettAdatokForm: FormGroup = new FormGroup({
    szervezetKod: new FormControl({value: '', disabled: false}, [Validators.pattern('^[0-9]*$'), Validators.required]),
    munkaszunetinap: new FormControl({value: false, disabled: false}, [Validators.required]),

    munkaidoKezdete: new FormControl({value: '', disabled: false}, [Validators.required]),
    munkaidoVege: new FormControl({value: '', disabled: false}, [Validators.required]),
    munkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),

    oradij: new FormControl({value: '', disabled: false}, [Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.required]),
    normalMunkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),
    napidijOsszeg: new FormControl({value: '', disabled: true}, [Validators.required]),

    tuloraDij: new FormControl({value: '', disabled: true}, [Validators.required]),
    tuloraMunkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),
    tuloraMunkaidoKezdete: new FormControl({value: '', disabled: true}, [Validators.required]),
    tuloraMunkaidoVege: new FormControl({value: '', disabled: true}, [Validators.required]),
    tuloraDijOsszeg: new FormControl({value: '', disabled: true}, [Validators.required]),

    ejszakaiPotlek: new FormControl({value: '', disabled: true}, [Validators.required]),
    ejszakaiMunkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),
    ejszakaiMunkaidoKezdete: new FormControl({value: '', disabled: true}, [Validators.required]),
    ejszakaiMunkaidoVege: new FormControl({value: '', disabled: true}, [Validators.required]),
    ejszakaiPotlekOsszeg: new FormControl({value: '', disabled: true}, [Validators.required]),

    unnepnapiPotlek: new FormControl({value: '', disabled: true}, [Validators.required]),
    unnepnapiMunkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),
    unnepnapiPotlekOsszeg: new FormControl({value: '', disabled: true}, [Validators.required]),

    szakkepzetsegetIgenyel: new FormControl({value: false, disabled: false}, [Validators.required]),
    munkanapokSzama: new FormControl({value: '', disabled: false}, [Validators.pattern('^[0-9]*$'), Validators.required]),
    osszesen: new FormControl({value: '', disabled: true}, [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<MunkaorakRogzitesePanelComponent>,
              private munkaltatoReszlegControllerService: MunkaltatoReszlegControllerService,
              private foglalkoztatasAdatokControllerService: FoglalkoztatasAdatokControllerService) {
    super();
    this.isInaktivGomb = !!data.adat.pdf ? true : false;
    this.fejlecCime = !!data.adat.pdf ? 'Munkaórák módosítása' : 'Munkaórák rögzítése';
    this.id = data.adat.id;
    this.navAdatokFk = data.adat.navAdatokFk;
    this.munkanapDatuma = data.adat.munkanapDatuma;
    this.munkavallaloiRogzitettAdatok = data.adat;


    if (data.adat.munkaidoKezdete != null) {
      this.munkavallaloiRogzitettAdatok = data.adat;
      this.szervezetKod = this.data.adat.reszlegKod;
      this.kivalasztottReszlegNev = this.data.adat.reszlegNeve;
      this.munkaidoKezdete = this.data.adat.munkaidoKezdete;
      this.munkaidoVege = this.data.adat.munkaidoVege;
      this.oradij = this.data.adat.oradij;
      this.munkaszunetinap = this.data.adat.munkaszunetinap;
      this.szakkepzetsegetIgenyel = this.data.adat.szakkepzetsegetIgenyel == 'Igényel' ? true : false;
      this.idoEllenorzese();
      this.munkadijakSzamolasa();
    }
  }

  ngOnInit(): void {
  }

  private idoEllenorzese(): void {
    if ((this.munkaidoKezdete.length > 0) && (this.munkaidoVege.length > 0)) {
      this.teljesMunkaidoPercekben = this.teljesMunkaidoSzamolas(this.munkaidoKezdete, this.munkaidoVege);
      this.normalMunkaidoPercekben = this.normalMunkaidoSzamolas(this.teljesMunkaidoPercekben);
      this.tuloraMunkaidoPercekben = this.tuloraMunkaidoSzamolas(this.munkaidoKezdete, this.teljesMunkaidoPercekben);
      this.ejszakaiMunkaidoPercekben = this.ejszakaiMunkaidoSzamolas(this.munkaidoKezdete, this.munkaidoVege, this.teljesMunkaidoPercekben);
      this.munkaorakSzama = moment().hours(0).minutes(this.teljesMunkaidoPercekben).format('HH:mm');
      this.unnepnapiMunkaorakSzama = this.munkaszunetinap ? moment().hours(0).minutes(this.teljesMunkaidoPercekben).format('HH:mm') : '00:00';
      this.normalMunkaorakSzama = moment().hours(0).minutes(this.normalMunkaidoPercekben).format('HH:mm');
      this.tuloraMunkaorakSzama = moment().hours(0).minutes(this.tuloraMunkaidoPercekben).format('HH:mm');
      this.ejszakaiMunkaorakSzama = moment().hours(0).minutes(this.ejszakaiMunkaidoPercekben).format('HH:mm');
      this.osszegekkSzamolasa();
    }
  }

  private munkadijakSzamolasa(): void {
    this.tuloraDij = this.oradij * 0.5;
    this.ejszakaiPotlek = this.oradij * 0.15;
    this.unnepnapiPotlek = this.munkaszunetinap ? this.oradij : 0;
    this.osszegekkSzamolasa();
    this.szakkepzetsegetIgenyel = this.oradij > 1300;
  }

  private teljesMunkaidoSzamolas(munkaidoKezdete: string, munkaidoVege: string): number {
    let teljesMunkaidoPercekben = 0;
    // Munkaidő vége (02:00) korábbi időpont mint a kezdet (10:00). (Napon átnyúlló munkaidő)
    // console.log(moment(munkaidoVege, 'HH:mm').diff(moment(munkaidoKezdete, 'HH:mm'), "minute"));
    if (moment(munkaidoVege, 'HH:mm').diff(moment(munkaidoKezdete, 'HH:mm'), "minute") < 0) {
      teljesMunkaidoPercekben = moment('24:00', 'HH:mm').diff(moment(this.munkaidoKezdete, 'HH:mm'), "minute") +
        moment(this.munkaidoVege, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute");
      // Ha a munkaidő vége 00:00 akkor Munkanapok száma 2 lenne, de az alábbi sorban ezt korrigáljuk.
      this.munkanapokSzama = munkaidoVege == '00:00' ? 1 : 2;
    } else {
      teljesMunkaidoPercekben = moment(this.munkaidoVege, 'HH:mm').diff(moment(this.munkaidoKezdete, 'HH:mm'), "minute");
      this.munkanapokSzama = 1;
    }
    return teljesMunkaidoPercekben;
  }

  private normalMunkaidoSzamolas(teljesMunkaidoPercekben: number): number {

    return (teljesMunkaidoPercekben <= 480) ? teljesMunkaidoPercekben : 480;
  }

  private tuloraMunkaidoSzamolas(munkaidoKezdete: string, teljesMunkaidoPercekben: number): number {
    this.tuloraMunkaidoKezdete = '';
    this.tuloraMunkaidoVege = '';
    let munkaidoKezdetePercekben = moment(munkaidoKezdete, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute") + 480;
    if (teljesMunkaidoPercekben > 480) {
      this.tuloraMunkaidoKezdete = moment().hours(0).minutes(munkaidoKezdetePercekben).format('HH:mm');
      this.tuloraMunkaidoVege = moment().hours(0).minutes(munkaidoKezdetePercekben + teljesMunkaidoPercekben - 480).format('HH:mm');
    }
    return (teljesMunkaidoPercekben > 480) ? teljesMunkaidoPercekben - 480 : 0;
  }

  private ejszakaiMunkaidoSzamolas(munkaidoKezdete: string, munkaidoVege: string, teljesMunkaidoPercek: number): number {
    let _06_OraPercek = 360;
    let _22_OraPercek = 1320;
    let _24_OraPercek = 1440;
    let _ejszakaiMunkaidoSzamolasPercek = 1350;

    munkaidoVege = munkaidoVege == '00:00' ? '24:00' : munkaidoVege;

    let munkaidoKezdetePercek = (moment(munkaidoKezdete, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute"));
    let munkaidoVegePercek = (moment(munkaidoVege, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute"));
    let _teljesMunkaidoVegeOsszPerc = munkaidoKezdetePercek + teljesMunkaidoPercek;

    // if (_ejszakaiMunkaidoSzamolasPercek >= _teljesMunkaidoVegeOsszPerc) {
    //   // Nincs éjszakai munkidő számolás
    //   this.ejszakaiMunkaidoKezdete = '';
    //   this.ejszakaiMunkaidoVege = '';
    //   this.ejszakaiMunkaorakSzama = '';
    //   this.ejszakaiPotlekOsszeg = 0;
    //   return 0;
    // }
    let _06_elottiEjszakaiPercek = 0;
    let _22_utaniEjszakaiPercek = 0;
    this.ejszakaiMunkaidoKezdete = '';
    this.ejszakaiMunkaidoVege = '';


    if (_teljesMunkaidoVegeOsszPerc > _24_OraPercek) {
      if (munkaidoKezdetePercek > _22_OraPercek) {
        _22_utaniEjszakaiPercek = _24_OraPercek - munkaidoKezdetePercek;
        this.ejszakaiMunkaidoKezdete = moment().hours(0).minutes(munkaidoKezdetePercek).format('HH:mm');
      } else {
        _22_utaniEjszakaiPercek = 120;
        this.ejszakaiMunkaidoKezdete = '22:00';
      }
    } else if (_teljesMunkaidoVegeOsszPerc > _22_OraPercek) {
      if (munkaidoKezdetePercek > _22_OraPercek) {
        _22_utaniEjszakaiPercek = munkaidoVegePercek - munkaidoKezdetePercek;
        this.ejszakaiMunkaidoKezdete = moment().hours(0).minutes(munkaidoKezdetePercek).format('HH:mm');
        this.ejszakaiMunkaidoVege = moment().hours(0).minutes(munkaidoVegePercek).format('HH:mm');
      } else {
        _22_utaniEjszakaiPercek = munkaidoVegePercek - _22_OraPercek;
        this.ejszakaiMunkaidoKezdete = '22:00'
        this.ejszakaiMunkaidoVege = moment().hours(0).minutes(munkaidoVegePercek).format('HH:mm');
      }
    }

    if (_teljesMunkaidoVegeOsszPerc > _24_OraPercek) {
      if (munkaidoKezdetePercek > _06_OraPercek) {
        if (_teljesMunkaidoVegeOsszPerc < 1800) {
          _06_elottiEjszakaiPercek = _teljesMunkaidoVegeOsszPerc - _24_OraPercek;
          this.ejszakaiMunkaidoVege = moment().hours(0).minutes(_06_elottiEjszakaiPercek).format('HH:mm');
        } else {
          _06_elottiEjszakaiPercek = _06_OraPercek;
          this.ejszakaiMunkaidoVege = '06:00'
        }
      } else {
        if (_teljesMunkaidoVegeOsszPerc < 1800) {
          _06_elottiEjszakaiPercek = _teljesMunkaidoVegeOsszPerc - _24_OraPercek - munkaidoKezdetePercek
          this.ejszakaiMunkaidoKezdete = moment().hours(0).minutes(munkaidoKezdetePercek).format('HH:mm');
          this.ejszakaiMunkaidoVege = moment().hours(0).minutes(_06_elottiEjszakaiPercek).format('HH:mm');
        } else {
          _06_elottiEjszakaiPercek = _06_OraPercek - munkaidoKezdetePercek;
          this.ejszakaiMunkaidoKezdete = moment().hours(0).minutes(munkaidoKezdetePercek).format('HH:mm');
          this.ejszakaiMunkaidoVege = '06:00'
        }
      }
    } else {
      if ((munkaidoKezdetePercek >= 0) && (munkaidoKezdetePercek < _06_OraPercek)) {
        if (munkaidoVegePercek < 360) {
          _06_elottiEjszakaiPercek = munkaidoVegePercek - munkaidoKezdetePercek;
          this.ejszakaiMunkaidoKezdete = moment().hours(0).minutes(munkaidoKezdetePercek).format('HH:mm');
          this.ejszakaiMunkaidoVege = moment().hours(0).minutes(munkaidoVegePercek).format('HH:mm');
        } else {
          _06_elottiEjszakaiPercek = 360 - munkaidoKezdetePercek;
          this.ejszakaiMunkaidoKezdete = moment().hours(0).minutes(munkaidoKezdetePercek).format('HH:mm');
          this.ejszakaiMunkaidoVege = '06:00';
        }
      }
    }

    // if (_ejszakaiMunkaidoSzamolasPercek >= _teljesMunkaidoVegeOsszPerc) {
    if ((_06_elottiEjszakaiPercek + _22_utaniEjszakaiPercek) <= 30) {
      // Nincs éjszakai munkidő számolás. Fél órára nem számolunk munkaidőt!
      this.ejszakaiMunkaidoKezdete = '';
      this.ejszakaiMunkaidoVege = '';
      this.ejszakaiMunkaorakSzama = '';
      this.ejszakaiPotlekOsszeg = 0;
      return 0;
    }

    return _06_elottiEjszakaiPercek + _22_utaniEjszakaiPercek;
  }

  private unnepnapSzamolasa() {
    if (this.munkaidoKezdete.length > 0 && this.munkaidoVege.length > 0 && this.oradij > 0) {
      let teljesMunkaidoPercekben = this.teljesMunkaidoSzamolas(this.munkaidoKezdete, this.munkaidoVege);
      this.unnepnapiPotlek = this.munkaszunetinap ? this.oradij : 0;
      this.unnepnapiMunkaorakSzama = this.munkaszunetinap ? moment().hours(0).minutes(teljesMunkaidoPercekben).format('HH:mm') : '00:00';
      this.osszegekkSzamolasa();
    }
  }

  private osszegekkSzamolasa() {
    if ((this.munkaidoKezdete.length > 0) && (this.munkaidoVege.length > 0) && (!!this.oradij) && (this.oradij > 0))
      this.napidijOsszeg = Math.round(this.teljesMunkaidoPercekben / 60 * this.oradij);
    this.tuloraDijOsszeg = Math.round(this.tuloraMunkaidoPercekben / 60 * this.tuloraDij);
    this.ejszakaiPotlekOsszeg = Math.round(this.ejszakaiMunkaidoPercekben / 60 * this.ejszakaiPotlek);
    this.unnepnapiPotlekOsszeg = this.munkaszunetinap ? Math.round(this.napidijOsszeg) : 0;
    this.osszesen = Math.round(this.napidijOsszeg + this.tuloraDijOsszeg + this.ejszakaiPotlekOsszeg + this.unnepnapiPotlekOsszeg);
    this.ellenorzesek();
  }

  private szervezetLekereseKodAlapjan(): void {
    if (!!this.szervezetKod) {
      this.munkaltatoReszlegControllerService.reszlegKod(this.szervezetKod).subscribe(reszleg => {
        if (!!reszleg) {
          this.kivalasztottReszlegId = reszleg.id;
          this.kivalasztottReszlegNev = reszleg.nev;
        } else {
          this.kivalasztottReszlegNev = 'Nem létező szervezet kód';
        }
      });
    }
  }

  private megseClick() {
    this.dialogRef.close({data: null});
  }

  private inaktivClick() {
    const title = 'Munkanap inaktívválása';
    const msg = 'Valóban INAKTÍVVÁ teszi a munkanapot? Munkanap: ' + formatDate(this.munkanapDatuma, 'yyyy.MM.dd', 'en_US');
    const dialogRef = this.dialog.open(MegerrositesDialogComponent, {
      data: {title: title, msg: msg}, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close({data: 'INAKTIV'});
      }
    });
  }

  private nullasClick() {
    if (!!this.kivalasztottReszlegId) {
      const title = 'NUllás nyomtatvány';
      const msg = 'Valóban NULLÁS NAV nyomtatványt akar készíteni? Munkanap: ' + formatDate(this.munkanapDatuma, 'yyyy.MM.dd', 'en_US');
      const dialogRef = this.dialog.open(MegerrositesDialogComponent, {
        data: {title: title, msg: msg}, disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.nullasKuldendoAdatOsszeallitasa();
          this.dialogRef.close({data: this.munkavallaloiRogzitettAdatok});
        }
      });
    }
  }

  private mentesClick() {
    if (this.ellenorzesek()) {
      this.kuldendoAdatOsszeallitasa();
      this.dialogRef.close({data: this.munkavallaloiRogzitettAdatok});
    }
  }

  private kuldendoAdatOsszeallitasa(): void {
    this.munkavallaloiRogzitettAdatok.id = this.id
    this.munkavallaloiRogzitettAdatok.navAdatokFk = this.navAdatokFk;
    this.munkavallaloiRogzitettAdatok.munkaltatoReszlegId = this.kivalasztottReszlegId;
    this.munkavallaloiRogzitettAdatok.oradij = this.oradij;
    this.munkavallaloiRogzitettAdatok.munkaidoKezdete = this.munkaidoKezdete;
    this.munkavallaloiRogzitettAdatok.munkaidoVege = this.munkaidoVege;
    this.munkavallaloiRogzitettAdatok.teljesMunkaorakSzama = this.teljesMunkaidoPercekben / 60;
    this.munkavallaloiRogzitettAdatok.tulorakDija = this.tuloraDij;
    this.munkavallaloiRogzitettAdatok.tuloraMunkaidoKezdete = this.tuloraMunkaidoKezdete;
    this.munkavallaloiRogzitettAdatok.tuloraMunkaidoVege = this.tuloraMunkaidoVege;
    this.munkavallaloiRogzitettAdatok.tulorakSzama = this.tuloraMunkaidoPercekben / 60;
    this.munkavallaloiRogzitettAdatok.ejszakaiOrakDija = this.ejszakaiPotlek;
    this.munkavallaloiRogzitettAdatok.ejszakaiMunkaidoKezdete = this.ejszakaiMunkaidoKezdete;
    this.munkavallaloiRogzitettAdatok.ejszakaiMunkaidoVege = this.ejszakaiMunkaidoVege;
    this.munkavallaloiRogzitettAdatok.ejszakaiOrakSzama = this.ejszakaiMunkaidoPercekben / 60;
    this.munkavallaloiRogzitettAdatok.munkaszunetinap = this.munkaszunetinap;
    this.munkavallaloiRogzitettAdatok.munkadijOsszesen = this.osszesen;
    this.munkavallaloiRogzitettAdatok.szakkepzetsegetIgenyel = this.szakkepzetsegetIgenyel;
    this.munkavallaloiRogzitettAdatok.munkanapokSzama = this.munkanapokSzama;
  }

  private nullasKuldendoAdatOsszeallitasa(): void {
    this.munkavallaloiRogzitettAdatok.id = this.id
    this.munkavallaloiRogzitettAdatok.navAdatokFk = this.navAdatokFk;
    this.munkavallaloiRogzitettAdatok.munkaltatoReszlegId = this.kivalasztottReszlegId;
    this.munkavallaloiRogzitettAdatok.oradij = 0;
    this.munkavallaloiRogzitettAdatok.munkaidoKezdete = '';
    this.munkavallaloiRogzitettAdatok.munkaidoVege = '';
    this.munkavallaloiRogzitettAdatok.teljesMunkaorakSzama = 0;
    this.munkavallaloiRogzitettAdatok.tulorakDija = 0;
    this.munkavallaloiRogzitettAdatok.tuloraMunkaidoKezdete = '';
    this.munkavallaloiRogzitettAdatok.tuloraMunkaidoVege = '';
    this.munkavallaloiRogzitettAdatok.tulorakSzama = 0;
    this.munkavallaloiRogzitettAdatok.ejszakaiOrakDija = 0;
    this.munkavallaloiRogzitettAdatok.ejszakaiMunkaidoKezdete = '';
    this.munkavallaloiRogzitettAdatok.ejszakaiMunkaidoVege = '';
    this.munkavallaloiRogzitettAdatok.ejszakaiOrakSzama = 0;
    this.munkavallaloiRogzitettAdatok.munkaszunetinap = false;
    this.munkavallaloiRogzitettAdatok.munkadijOsszesen = 0;
    this.munkavallaloiRogzitettAdatok.szakkepzetsegetIgenyel = false;
    this.munkavallaloiRogzitettAdatok.munkanapokSzama = 1;
  }

  private ellenorzesek(): boolean {
    this.munkaidoError1 = this.munkaidoError2 = this.munkaidoError3 = this.munkaidoError4 = null;
    if (this.rogzitettAdatokForm.valid) {
      const egyNapMinimumOrak = this.minimumOrak();
      const egyNapMaximumOrak = this.maximumOrak();
      let minimumPihenoido: boolean = false;
      this.foglalkoztatasAdatokControllerService.munkaidokEllenorzese(this.navAdatokFk, formatDate(this.munkanapDatuma, 'yyyy.MM.dd', 'en_US'), this.munkaidoKezdete, (this.teljesMunkaidoPercekben / 60))
        .subscribe(valasz => {
          if (valasz.length == 0) {
            minimumPihenoido = true;
          } else {
            if (valasz.length == 1) {
              this.munkaidoError3 = valasz[0];
            } else {
              this.munkaidoError3 = valasz[0];
              this.munkaidoError4 = valasz[1];
            }
          }
          this.hibakLathato = !(egyNapMinimumOrak && egyNapMaximumOrak && minimumPihenoido);
          return egyNapMinimumOrak && egyNapMaximumOrak && minimumPihenoido;
        });
    }
    return true;
  }

  private minimumOrak(): boolean {
    const orak = this.teljesMunkaidoPercekben / 60;
    if (orak < 4) {
      this.munkaidoError1 = 'Egy nap minimum 4 órát kell dolgozni!'
      return false
    } else {
      return true;
    }
  }

  private maximumOrak(): boolean {
    const orak = this.teljesMunkaidoPercekben / 60;
    if (orak > 12) {
      this.munkaidoError2 = 'Egy nap maximum 12 órát lehet dolgozni!'
      return false
    } else {
      return true;
    }
  }
}
