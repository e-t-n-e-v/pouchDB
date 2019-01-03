import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import PouchDB from 'pouchdb';

/**
 * Generated class for the NewPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-person',
  templateUrl: 'new-person.html',
})
export class NewPersonPage {
  private xname;
  private xphone;
  private xemail;
  private xdb;

  // for editing
  private person;
  private person_id;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.setupDB();
    this.person_id = this.navParams.get('person_id');

    if(this.person_id != null){
      this.xdb.get(this.person_id, (err, result)=>{
        if(!err){
          this.person = result;
          this.xname = result.xname;
          this.xphone = result.xphone;
          this.xemail = result.xemail;
        }
      });
    }
  }

  setupDB(){
    this.xdb = new PouchDB('contacts');
  }

  cancel(){
    this.navCtrl.pop();
  }


  // add to database
  save(){

    if(this.person){
      // for update | _id and _rev are both required to include
      this.xdb.put({
        _id: this.person._id,
        _rev: this.person._rev,
        xname: this.xname,
        xemail: this.xemail,
        xphone: this.xphone
      },(err, result)=>{
        if(!err){
          alert('updated');
          this.navCtrl.pop();
        }else{
          console.log(err, result);
        }
      });
    }else{
      // for create
      this.xdb.post({
        xname: this.xname,
        xemail: this.xemail,
        xphone: this.xphone
      }, (err, result) => {
        if(!err){
          alert('success');
          this.navCtrl.pop();
        }
      });
    }

  }

}
