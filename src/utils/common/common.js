import React from 'react';
import { isEmpty } from 'validate.js';


export function currentDate() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let currentDate = today.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date);

    return currentDate;
}

export function timeFomat(time) {
    return !isEmpty(time) ? time.substring(0, 2) + ":" + time.substring(2, 4) : '';
}

export function percentIncrease(totData, sumData) {
    return ((sumData / totData) * 100).toFixed(2);
}