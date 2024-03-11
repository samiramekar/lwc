import { LightningElement,wire } from 'lwc';
import getRec from "@salesforce/apex/vehicleservicesLwc.vehList";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import {getFieldInfo,getObj} from "lightning/uiObjectInfoApi";
import Veh_Obj from "@salesforce/schema/Vehicle_Services__c";
import Cate from "@salesforce/schema/Vehicle_Services__c.Service_Category__c";
import Styp from "@salesforce/schema/Vehicle_Services__c.Select_Vehicle_Type__c";

export default class Vehicle1 extends LightningElement {
    
    @wire(getObj, { objectApiName: Veh_Obj})
    options=[];
    list=[];
    loc;
    vname;
    des;
    accountRecordTypeId;
    

    results({ error, data }) {
        if (data) {
          this.accountRecordTypeId = data.defaultRecordTypeId;
          this.error = undefined;
        } else if (error) {
          this.error = error;
          this.accountRecordTypeId = undefined;
        }
      }

    @wire(getFieldInfo, { recordTypeId: "$accountRecordTypeId", fieldApiName: Cate })
  picklistResults({ error, data }) {
    if (data) {
      this.options = data.values;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.options = undefined;
    }
  }

  @wire(getFieldInfo, { recordTypeId: "$accountRecordTypeId", fieldApiName: Styp })
  picklistResults({ error, data }) {
    if (data) {
      this.list = data.values;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.list = undefined;
    }
  }

    handleChange(event) {
        this.value = event.detail.value;
        this.category=event.target.value;
    }

    

    handleClick(event) {
        this.value1 = event.detail.value1;
        this.typ=event.target.value;
        
    }

    Location(event){
        this.loc=event.target.value;
    }

    VName(event){
        this.vname=event.target.value;
    }

    Description(event){
        this.des=event.target.value;
    }

    submit(event){
        var vehObj={};
        vehObj.locn=this.loc;
        vehObj.Cate=this.options;
        vehObj.Styp=this.list;
        vehObj.vnm=this.vname;
        vehObj.desp=this.des;
        alert('Successfully registered'+JSON.stringify(vehObj));
        getRec({locn:vehObj.locn, vnm:vehObj.vnm, desp:vehObj.desp})
        .then(res=>{console.log('Record Successfully inserted'+JSON.stringify(res))
        const event = new ShowToastEvent({
            title: 'Candidate Registered',
            message: 'Order placed',
            variant: 'success'
    });this.dispatchEvent(successEvent);
    
})
        .catch(err=>{console.log('Error'+JSON.stringify(err))});
    }

}