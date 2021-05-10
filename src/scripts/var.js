let today = new Date();
const monthName = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];
const dayName = [
  'Domenica',
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
];
var feste = [
  '01/01', // Capodanno
  '06/01', // Befana
  // Pasqua e Pasquetta sono calcolate e poi aggiunte qui
  '25/04', // Liberazione
  '01/05', // Festa dei lavoratori
  '02/06', // Festa della repubblica
  '29/06', // San Pietro e Paolo (solo a Roma)
  '15/08', // Ferragosto
  '01/11', // Tutti i santi
  '08/12', // Immacolata
  '25/12', // Natale
  '26/12', // Santo Stefano
];
var pasqua, pasquetta;
const idTurno = 40;
const primaSosta = 33;
const primoGiorno = new Date(2021, 3, 1); // Formato -> aaaa, mm, gg (mm: starts from 0)
let soste;
let nomi;
let winHeight = 0;
