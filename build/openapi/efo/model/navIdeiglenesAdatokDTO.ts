/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * NAV ideiglenes adatok DTO
 */
export interface NavIdeiglenesAdatokDTO { 
    /**
     * ID
     */
    id?: number;
    /**
     * A munkavállaló neve
     */
    munkavallalo?: string;
    /**
     * A munkavállaló adóazonosítója
     */
    adoszam?: string;
    /**
     * A munkavállaló belépési ideje
     */
    belepesNapja?: string;
    /**
     * Bejelentés jellege
     */
    bejelentesJellege?: string;
    /**
     * Adatlap típusa
     */
    adatlapTipusa?: string;
    /**
     * Kezdés napja
     */
    kezdesNapja?: string;
    /**
     * Foglalkoztatás jellege
     */
    foglalkoztatasJellege?: string;
    /**
     * Munkanapok száma
     */
    munkanapokSzama?: string;
    /**
     * A munkavállaló TAJ száma
     */
    tajSzam?: string;
    /**
     * Máshol biztosított
     */
    masholBiztositott?: string;
    /**
     * Nyilatkozat létszámról
     */
    nyilatkozatLetszamrol?: string;
    /**
     * Nyilatkozat adótartozásról
     */
    nyilatkozatAdotartozasrol?: string;
    /**
     * Adatlap feldolgozottsági státusza NAV
     */
    navFeldolgozasStatusza?: string;
    /**
     * Adatlap nyilvántartási száma NAV
     */
    navNyilvantartasiSzama?: string;
    /**
     * Adatok átforgatásának státusza
     */
    statusz?: NavIdeiglenesAdatokDTO.StatuszEnum;
    /**
     * A NAV adat rögzítésének ideje
     */
    modositasIdeje: string;
}
export namespace NavIdeiglenesAdatokDTO {
    export type StatuszEnum = 'OK' | 'ERROR';
    export const StatuszEnum = {
        Ok: 'OK' as StatuszEnum,
        Error: 'ERROR' as StatuszEnum
    };
}


