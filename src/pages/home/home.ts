/*
ionic cordova build android
ionic cordova emulate android
*/
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewPersonPage } from '../new-person/new-person';
import PouchDB from 'pouchdb';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private persons;
  private xdb;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter(){
    this.refresh();
  }


  // fetch all data from DB
  refresh(){
      this.xdb = new PouchDB('contacts');
      this.persons = [];

      this.xdb.allDocs({include_docs: true}, (err, result)=>{
        if(!err){
          let rows = result.rows;
          for (let i=0; i<rows.length; i++){
            this.persons.push(rows[i].doc);
          }
          console.log(rows[0].doc);
        }
      });
      
  }

  // navigate through other component view
  createNew(){
    this.navCtrl.push(NewPersonPage);
  }

  // delete record
  delete(person){
    if(confirm('Are you sure?')){
      this.xdb.remove(person, (err, result)=>{
        if(!err){
          alert('deleted');
          this.refresh();
        }
      });
    }
  }

  // navigate through other component view and pass data
  edit(person){
    this.navCtrl.push(NewPersonPage, {person_id: person._id});
  }

}
