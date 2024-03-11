import { LightningElement, api, track} from 'lwc';

import getRec from "@salesforce/apex/vehicleservicesLwc.vehList";

import Loc from "@salesforce/schema/Vehicle_Services__c.Tell_us_your_location__c";
import Cat from "@salesforce/schema/Vehicle_Services__c.Service_Category__c";
import Typ from "@salesforce/schema/Vehicle_Services__c.Select_Vehicle_Type__c";
import Dte from "@salesforce/schema/Vehicle_Services__c.Date_Time__c";
import Nm from "@salesforce/schema/Vehicle_Services__c.Vehicle_Name__c";
import Des from "@salesforce/schema/Vehicle_Services__c.Description__c";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ParentLwc extends LightningElement {
    value = 'autorepair';
    value1 ='bike';
    Locn;
    Cate;
    Typ;
    Dat;
    Name;
    Descrip;
    
    get options() {
        return [
            { label: 'Auto Repair', value: 'autorepair' },
            { label: 'Car Washes', value: 'carwashes' },
            { label: 'Towing Services', value: 'towingservices' },
            { label: 'Roadside Assistance Services', value: 'Roadsideassistanceservices'},
            { label: 'Driving School', value: 'drivingschool'}
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        this.Cate=event.target.value;
    }

    get list() {
        return [
            { label: 'Bike', value: 'bike' },
            { label: 'Car', value: 'car' },
            
        ];
    }

    handleClick(event) {
        this.value1 = event.detail.value1;
        this.Typ=event.target.value;
        
    }

    Location(event){
        this.Locn=event.target.value;
    }

    Date(event){
        this.Dat=event.target.value;
    }

    VName(event){
        this.Name=event.target.value;
    }

    Description(event){
        this.Descrip=event.target.value;
    }

    submit(){
        alert('You successfully submitted details');
        var vhcl={};
        vhcl=this.Locn;
        vhcl=this.Cate;
        vhcl=this.Typ;
        vhcl=this.Dat;
        vhcl=this.Name;
        vhcl=this.Descrip;
        getRec(vehList=vhcl)
        const event = new ShowToastEvent({
                title: 'Candidate Registered',
                message: 'Order placed',
                variant: 'success'
            });
            this.dispatchEvent(event);
        } catch (err) {
            const event = new ShowToastEvent({
                title: 'Error',
                message: 'An error occurred while processing your request',
                variant: 'error'
            });
            this.dispatchEvent(event);
        }
        cancel(){
            confirm('Are you sure to cancel?');
        } 
        }

        
    

