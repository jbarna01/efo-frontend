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
 * Munkáltató DTO
 */
export interface MunkavallaloiRogzitettAdatokDTO { 
    /**
     * ID
     */
    id?: number;
    /**
     * nav_adatok_fk
     */
    navAdatokFk?: number;
    /**
     * A munkanap dátuma
     */
    munkanap?: string;
    /**
     * Munkaidő kezdete
     */
    munkaidoKezdete?: string;
    /**
     * Munkaidő vége
     */
    munkaidoVege?: string;
    /**
     * Munkaórák száma
     */
    munkaorakSzama?: number;
    /**
     * Normál munkaórák száma
     */
    normalOrakSzama?: number;
    /**
     * Túlórák száma
     */
    tulorakSzama?: number;
    /**
     * Óradij
     */
    oradij?: number;
    /**
     * Napdij
     */
    napidij?: number;
    /**
     * Túlóradíj
     */
    tuloradij?: number;
    /**
     * Státusz
     */
    statusz?: string;
    /**
     * A rekord módosítás ideje
     */
    modositasIdeje?: string;
}

