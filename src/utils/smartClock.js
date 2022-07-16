import { format, formatDistanceToNowStrict } from 'date-fns';
import { useState } from "react";

// ----------------------------------------------------------------------
const DateDiff = {
  inSeconds: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (1000));
  },
  inDays: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (24 * 3600 * 1000));
  },

  inWeeks: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
  },

  inMonths: function (d1, d2) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
  },

  inYears: function (d1, d2) {
    return d2.getFullYear() - d1.getFullYear();
  }
}

export default function SmartClock({date}) {
  const [counter, setCounter] = useState(0)

  useState(()=>{
    setInterval(()=>{
      setCounter(counter => counter + 1);
    }, 6000);
  }, [])

  if (DateDiff.inDays(new Date(date), new Date()) < 3) {
    if (60 > DateDiff.inSeconds(new Date(date), new Date()) ) return "1 minute ago"

    return formatDistanceToNowStrict(new Date(date), { addSuffix: true })
  } else {
    return format(new Date(date), 'dd-MM-yyyy')
  }
}
