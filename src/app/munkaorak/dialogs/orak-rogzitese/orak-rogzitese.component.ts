import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MunkaorakRogzitesePanelComponent} from "../../munkaorak-rogzitese-panel/munkaorak-rogzitese-panel.component";
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MunkaltatoReszlegControllerService, MunkavallaloiRogzitettAdatokDTO} from "../../../../../build/openapi/efo";
import {ComponentBase} from "../../../common/utils/component-base";

@Component({
  selector: 'app-orak-rogzitese',
  templateUrl: './orak-rogzitese.component.html',
  styleUrls: ['./orak-rogzitese.component.css']
})
export class OrakRogziteseComponent extends ComponentBase implements OnInit {

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
  ejszakaiMunkaorakSzama: string = '';
  ejszakaiMunkaidoPercekben: number = 0;
  unnepnapiMunkaorakSzama: string = '';
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

  rogzitettAdatokForm: FormGroup = new FormGroup({
    szervezetKod: new FormControl({value: '', disabled: false}, [Validators.pattern('^[0-9]*$'), Validators.required]),
    munkaszunetinap: new FormControl({value: false, disabled: false}, [Validators.required]),

    munkaidoKezdete: new FormControl({value: '', disabled: false}, [Validators.required]),
    munkaidoVege: new FormControl({value: '', disabled: false}, [Validators.required]),
    munkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),

    oradij: new FormControl({value: '', disabled: false}, [Validators.pattern('^[0-9]*$'), Validators.required]),
    normalMunkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),
    napidijOsszeg: new FormControl({value: '', disabled: true}, [Validators.required]),
    tuloraDij: new FormControl({value: '', disabled: true}, [Validators.required]),
    tuloraMunkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),
    tuloraDijOsszeg: new FormControl({value: '', disabled: true}, [Validators.required]),

    ejszakaiPotlek: new FormControl({value: '', disabled: true}, [Validators.required]),
    ejszakaiMunkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),
    ejszakaiPotlekOsszeg: new FormControl({value: '', disabled: true}, [Validators.required]),

    unnepnapiPotlek: new FormControl({value: '', disabled: true}, [Validators.required]),
    unnepnapiMunkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),
    unnepnapiPotlekOsszeg: new FormControl({value: '', disabled: true}, [Validators.required]),

    szakkepzetsegetIgenyel: new FormControl({value: false, disabled: false}, [Validators.required]),
    osszesen: new FormControl({value: '', disabled: true}, [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<MunkaorakRogzitesePanelComponent>,
              private munkaltatoReszlegControllerService: MunkaltatoReszlegControllerService) {
    super();
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
      this.szakkepzetsegetIgenyel = this.data.adat.szakkepzetsegetIgenyel;
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
      this.tuloraMunkaidoPercekben = this.tuloraMunkaidoSzamolas(this.teljesMunkaidoPercekben);
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
    this.tuloraDij = this.oradij * 1.5;
    this.ejszakaiPotlek = this.oradij * 0.15;
    this.unnepnapiPotlek = this.munkaszunetinap ? this.oradij : 0;
    this.osszegekkSzamolasa();
  }

  private teljesMunkaidoSzamolas(munkaidoKezdete: string, munkaidoVege: string): number {
    let teljesMunkaidoPercekben = 0;
    // Munkaidő vége (02:00) korábbi időpont mint a kezdet (10:00). (Napon átnyúlló munkaidő)
    if (moment(munkaidoVege, 'HH:mm').diff(moment(munkaidoKezdete, 'HH:mm'), "minute") < 0) {
      teljesMunkaidoPercekben = moment('24:00', 'HH:mm').diff(moment(this.munkaidoKezdete, 'HH:mm'), "minute") +
        moment(this.munkaidoVege, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute");
    } else {
      teljesMunkaidoPercekben = moment(this.munkaidoVege, 'HH:mm').diff(moment(this.munkaidoKezdete, 'HH:mm'), "minute");
    }
    return teljesMunkaidoPercekben;
  }

  private normalMunkaidoSzamolas(teljesMunkaidoPercekben: number): number {

    return (teljesMunkaidoPercekben <= 480) ? teljesMunkaidoPercekben : 480;
  }

  private tuloraMunkaidoSzamolas(teljesMunkaidoPercekben: number): number {

    return (teljesMunkaidoPercekben > 480) ? teljesMunkaidoPercekben - 480 : 0;
  }

  private ejszakaiMunkaidoSzamolas(munkaidoKezdete: string, munkaidoVege: string, teljesMunkaidoPercek: number): number {
    let _06_OraPercek = 360;
    let _22_OraPercek = 1320;
    let _24_OraPercek = 1440;

    munkaidoVege = munkaidoVege == '00:00' ? '24:00' : munkaidoVege;

    let munkaidoKezdetePercek = (moment(munkaidoKezdete, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute"));
    let munkaidoVegePercek = (moment(munkaidoVege, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute"));
    let _teljesMunkaidoVegeOsszPerc = munkaidoKezdetePercek + teljesMunkaidoPercek;

    let _06_elottiEjszakaiPercek = 0;
    let _22_utaniEjszakaiPercek = 0;

    if (_teljesMunkaidoVegeOsszPerc > _24_OraPercek) {
      if (munkaidoKezdetePercek > _22_OraPercek) {
        _22_utaniEjszakaiPercek = _24_OraPercek - munkaidoKezdetePercek;
      } else {
        _22_utaniEjszakaiPercek = 120;
      }
    } else if (_teljesMunkaidoVegeOsszPerc > _22_OraPercek) {
      if (munkaidoKezdetePercek > _22_OraPercek) {
        _22_utaniEjszakaiPercek = munkaidoVegePercek - munkaidoKezdetePercek;
      } else {
        _22_utaniEjszakaiPercek = munkaidoVegePercek - _22_OraPercek;
      }
    }

    if (_teljesMunkaidoVegeOsszPerc > _24_OraPercek) {
      if (munkaidoKezdetePercek > _06_OraPercek) {
        if (_teljesMunkaidoVegeOsszPerc < 1800) {
          _06_elottiEjszakaiPercek = _teljesMunkaidoVegeOsszPerc - _24_OraPercek
        } else {
          _06_elottiEjszakaiPercek = _06_OraPercek;
        }
      } else {
        if (_teljesMunkaidoVegeOsszPerc < 1800) {
          _06_elottiEjszakaiPercek = _teljesMunkaidoVegeOsszPerc - _24_OraPercek - munkaidoKezdetePercek
        } else {
          _06_elottiEjszakaiPercek = _06_OraPercek - munkaidoKezdetePercek;
        }
      }
    } else {
      if ((munkaidoKezdetePercek >= 0) && (munkaidoKezdetePercek < _06_OraPercek)) {
        if (munkaidoVegePercek < 360) {
          _06_elottiEjszakaiPercek = munkaidoVegePercek - munkaidoKezdetePercek;
        } else {
          _06_elottiEjszakaiPercek = 360 - munkaidoKezdetePercek;
        }
      }
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
      this.napidijOsszeg = Math.round(this.normalMunkaidoPercekben / 60 * this.oradij);
    this.tuloraDijOsszeg = Math.round(this.tuloraMunkaidoPercekben / 60 * this.tuloraDij);
    this.ejszakaiPotlekOsszeg = Math.round(this.ejszakaiMunkaidoPercekben / 60 * this.ejszakaiPotlek);
    this.unnepnapiPotlekOsszeg = this.munkaszunetinap ? Math.round(this.napidijOsszeg + this.tuloraDijOsszeg + this.ejszakaiPotlekOsszeg) : 0;
    this.osszesen = Math.round(this.napidijOsszeg + this.tuloraDijOsszeg + this.ejszakaiPotlekOsszeg + this.unnepnapiPotlekOsszeg);
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

  private mentesClick() {
    this.munkavallaloiRogzitettAdatok.id = this.id
    this.munkavallaloiRogzitettAdatok.navAdatokFk = this.navAdatokFk;
    this.munkavallaloiRogzitettAdatok.munkaltatoReszlegId = this.kivalasztottReszlegId;
    this.munkavallaloiRogzitettAdatok.munkaidoKezdete = this.munkaidoKezdete;
    this.munkavallaloiRogzitettAdatok.munkaidoVege = this.munkaidoVege;
    this.munkavallaloiRogzitettAdatok.teljesMunkaorakSzama = this.teljesMunkaidoPercekben / 60;
    this.munkavallaloiRogzitettAdatok.normalOrakSzama = this.normalMunkaidoPercekben / 60;
    this.munkavallaloiRogzitettAdatok.tulorakSzama = this.tuloraMunkaidoPercekben / 60;
    this.munkavallaloiRogzitettAdatok.ejszakaiOrakSzama = this.ejszakaiMunkaidoPercekben / 60;
    this.munkavallaloiRogzitettAdatok.oradij = this.oradij;
    this.munkavallaloiRogzitettAdatok.tulorakDija = this.tuloraDij;
    this.munkavallaloiRogzitettAdatok.ejszakaiOrakDija = this.ejszakaiPotlek;
    this.munkavallaloiRogzitettAdatok.munkaszunetinap = this.munkaszunetinap;
    this.munkavallaloiRogzitettAdatok.szakkepzetsegetIgenyel = this.szakkepzetsegetIgenyel;

    this.dialogRef.close({data: this.munkavallaloiRogzitettAdatok});
  }

}
