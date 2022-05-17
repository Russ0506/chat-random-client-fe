import React from 'react';
import { isEmpty } from 'validate.js';


export function currentDate(){
    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let currentDate = today.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date);

    return currentDate;
}

export function timeFomat(time){
    return !isEmpty(time) ? time.substring(0, 2) + ":" + time.substring(2, 4) : '';
}

export function percentIncrease(totData, sumData){
    return ((sumData/totData)*100).toFixed(2);
}

export const GRP_COLOR = ["#CB25AE", "#06CB28", "#6C50F1", "#ADCE11", "#3110CE", "#00C9F4", "#B37542", "#5A7C9A", "#53A267", "#6D7987", "#7E7678", "#04A9F0", "#CB3E29", "#D9B81C", "#33C13A"];