import { LightningElement,wire } from 'lwc';
import getRec from "@salesforce/apex/vehicleClass.vehlist";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import VEHICLE_OBJECT from "@salesforce/schema/Vehicle_Services__c";
import VEHICLE_FIELD from "@salesforce/schema/Vehicle_Services__c.Select_Vehicle_Type__c";
import CATEGORY_FIELD from "@salesforce/schema/Vehicle_Services__c.Service_Category__c";
import { ShowToastEvent } from "lightning/platformShowToastEvent";


export default class Vehicle2 extends LightningElement {

    intVar;
    categoryValue=[];
    varCategory;
    list=[];
    varList;
    dte;
    vn;
    des;

    onclick(event){
        this.intVar=event.target.value;
    }

    @wire(getObjectInfo, {objectApiName: VEHICLE_OBJECT})
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: CATEGORY_FIELD })
    picklistResults({ error, data }) {
        if (data) {
            this.categoryValue = data.values.map((picklist) => ({
                label: picklist.label,
                value: picklist.value,
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.categoryValue = undefined;
        }
    }

    handleChange(event) {
        this.varCategory = event.target.value;
    }

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName:  VEHICLE_FIELD})
    picklistResults1({ error, data }) {
        if (data) {
            this.list = data.values.map((item) => ({
                label: item.label,
                value: item.value,
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.list = undefined;
        }
    }

    vehhandle(event){
        this.varList=event.target.value;
    }

    Date(event){
        this.dte=event.target.value;
    }

    VName(event){
        this.vn=event.target.value;
    }

    Description(event){
        this.des=event.target.value;
    }

    handleClick(){
        var vehObj={};
        vehObj.Tell_us_your_location__c=this.intVar;
        vehObj.Service_Category__c=this.varCategory;
        vehObj.Select_Vehicle_Type__c=this.varList;
        vehObj.Date_Time__c=this.dte;
        vehObj.Vehicle_Name__c=this.vn;
        vehObj.Description__c=this.des;
        getRec({veh:vehObj})
        .then(res=>{
            const evt = new ShowToastEvent({
                title: 'Success',
                message: 'Successfully Created',
                variant: 'success',
              });
              this.dispatchEvent(evt);
            console.log('Success'+JSON.stringify(res))})
        .catch(err=>{console.log('error'+JSON.stringify(err))});
    }

    
}