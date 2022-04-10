import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MunkaorakRogzitesePanelComponent} from "../../munkaorak-rogzitese-panel/munkaorak-rogzitese-panel.component";
import * as moment from "moment";
import {EgyNapRogzitettAdatai} from "../../munkaorak.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MunkaltatoReszlegControllerService} from "../../../../../build/openapi/efo";
import {ComponentBase} from "../../../common/utils/component-base";

@Component({
  selector: 'app-orak-rogzitese',
  templateUrl: './orak-rogzitese.component.html',
  styleUrls: ['./orak-rogzitese.component.css']
})
export class OrakRogziteseComponent extends ComponentBase implements OnInit {

  // private dialogRef: MatDialogRef<MunkaorakRogzitesePanelComponent>;
  id: number;
  navAdatokFk: number;
  munkanap: Date;
  munkaidoKezdete: string = '';
  munkaidoVege: string = '';
  munkaorakSzama: string = '';
  normalMunkaorakSzama: string = '';
  tuloraMunkaorakSzama: string = '';
  ejszakaiMunkaorakSzama: string = '';
  unnepnapiMunkaorakSzama: string = '';
  egyNapRogzitettAdatai: EgyNapRogzitettAdatai;
  napidij: number = 0;
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
    munakszunetinap: new FormControl({value: false, disabled: false}, [Validators.required]),

    munkaidoKezdete: new FormControl({value: '', disabled: false}, [Validators.required]),
    munkaidoVege: new FormControl({value: '', disabled: false}, [Validators.required]),
    munkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),

    napidij: new FormControl({value: '', disabled: false}, [Validators.pattern('^[0-9]*$'), Validators.required]),
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
    this.id = data.id;
    this.navAdatokFk = data.navAdatokFk;
    this.munkanap = data.munkanap;
    this.egyNapRogzitettAdatai = new EgyNapRogzitettAdatai();
  }

  ngOnInit(): void {
  }

  private idoEllenorzese(): void {
    if ((this.munkaidoKezdete.length > 0) && (this.munkaidoVege.length > 0)) {
      let teljesMunkaidoPercekben = this.teljesMunkaidoSzamolas(this.munkaidoKezdete, this.munkaidoVege);
      let normalMunkaidoPercekben = this.normalMunkaidoSzamolas(teljesMunkaidoPercekben);
      let tuloraMunkaidoPercekben = this.tuloraMunkaidoSzamolas(teljesMunkaidoPercekben);
      let ejszakaiMunkaidoPercekben = this.ejszakaiMunkaidoSzamolas(this.munkaidoKezdete, this.munkaidoVege);
      this.munkaorakSzama = moment().hours(0).minutes(teljesMunkaidoPercekben).format('HH:mm');
      this.unnepnapiMunkaorakSzama = this.munkaszunetinap ? moment().hours(0).minutes(teljesMunkaidoPercekben).format('HH:mm') : '00:00';
      this.normalMunkaorakSzama = moment().hours(0).minutes(normalMunkaidoPercekben).format('HH:mm');
      this.tuloraMunkaorakSzama = moment().hours(0).minutes(tuloraMunkaidoPercekben).format('HH:mm');
      this.ejszakaiMunkaorakSzama = moment().hours(0).minutes(ejszakaiMunkaidoPercekben).format('HH:mm');
      this.osszegekkSzamolasa();
    }
  }

  private munkadijakSzamolasa(): void {
    this.tuloraDij = this.napidij * 1.5;
    this.ejszakaiPotlek = this.napidij * 0.15;
    this.unnepnapiPotlek = this.munkaszunetinap ? this.napidij : 0;
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

  private ejszakaiMunkaidoSzamolas(munkaidoKezdete: string, munkaidoVege: string): number {
    let _06_OraPercek = 360;
    let _22_OraPercek = 1320;
    let _24_OraPercek = 1440;

    let munkaidoKezdetePercek = (moment(munkaidoKezdete, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute"));
    let munkaidoVegePercek = (moment(munkaidoVege, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute"));

    let _06_elottiEjszakaiPercek = 0;
    let _22_utaniEjszakaiPercek = 0;

    //22-24 -> MK<22  :: (MV<22, 22<MV<=24, E-MV:24)
    if (munkaidoKezdetePercek < _22_OraPercek) {
      if (munkaidoVegePercek > _22_OraPercek) {
        _22_utaniEjszakaiPercek = munkaidoVegePercek < _24_OraPercek ? munkaidoVegePercek - _22_OraPercek : 120;
      }
    }

    //22-24 -> MK>22 és MK<=24  :: (22>MV<=24, E-MV:24:00)
    if (munkaidoKezdetePercek > _22_OraPercek) {
      _22_utaniEjszakaiPercek = (munkaidoVegePercek > _22_OraPercek && munkaidoVegePercek <= _24_OraPercek) ? munkaidoVegePercek - munkaidoKezdetePercek : _24_OraPercek - munkaidoKezdetePercek;
    }

    //00-06 -> MK>0 és MK<6 ::(MV<=6, E-MV:06:00)
    if (munkaidoKezdetePercek > 0 && munkaidoVegePercek < _06_OraPercek) {
      _06_elottiEjszakaiPercek = (munkaidoVegePercek < _06_OraPercek) ? munkaidoVegePercek - munkaidoKezdetePercek : _06_OraPercek - munkaidoKezdetePercek;
    }
    return _06_elottiEjszakaiPercek + _22_utaniEjszakaiPercek;
  }

  private unnepnapSzamolasa() {
    if (this.munkaidoKezdete.length > 0 && this.munkaidoVege.length > 0 && this.napidij > 0) {
      let teljesMunkaidoPercekben = this.teljesMunkaidoSzamolas(this.munkaidoKezdete, this.munkaidoVege);
      this.unnepnapiPotlek = this.munkaszunetinap ? this.napidij : 0;
      this.unnepnapiMunkaorakSzama = this.munkaszunetinap ? moment().hours(0).minutes(teljesMunkaidoPercekben).format('HH:mm') : '00:00';
      this.osszegekkSzamolasa();
    }
  }

  private osszegekkSzamolasa() {
    if ((this.munkaidoKezdete.length > 0) && (this.munkaidoVege.length > 0) && (!!this.napidij) && (this.napidij > 0))
      this.napidijOsszeg = Math.round(moment(this.normalMunkaorakSzama, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute") * this.napidij / 60);
    this.tuloraDijOsszeg = Math.round(moment(this.tuloraMunkaorakSzama, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute") * this.tuloraDij / 60);
    this.ejszakaiPotlekOsszeg = Math.round(moment(this.ejszakaiMunkaorakSzama, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute") * this.ejszakaiPotlek / 60);
    this.unnepnapiPotlekOsszeg = this.munkaszunetinap ? Math.round(this.napidijOsszeg + this.tuloraDijOsszeg + this.ejszakaiPotlekOsszeg + this.unnepnapiPotlekOsszeg) : 0;
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
    this.egyNapRogzitettAdatai.id = this.id
    this.egyNapRogzitettAdatai.navAdatokFk = this.navAdatokFk;
    this.egyNapRogzitettAdatai.munkanap = this.munkanap;
    this.egyNapRogzitettAdatai.munkaidoKezdete = this.munkaidoKezdete;
    this.egyNapRogzitettAdatai.munkaidoVege = this.munkaidoVege;
    this.egyNapRogzitettAdatai.munkaorakSzama = this.munkaorakSzama;

    this.dialogRef.close({data: this.egyNapRogzitettAdatai});
  }

}
