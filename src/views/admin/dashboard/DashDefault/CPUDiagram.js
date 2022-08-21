import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { CDBContainer } from "cdbreact";

const CPUDiagram = ({ title = null }) => {
  const [data, setData] = useState({
    labels: ["Used", "Free"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
        data: [65, 35],
      },
    ],
  });

  
  useEffect(() => {
   let dtaDefault = randomDta();
   resetDiagram(dtaDefault);
   setInterval(() => {
    let dta = randomDta();
    resetDiagram(dta);
   }, 7000);
  }, []);

  function resetDiagram(dtaArr) {
    setData({
      labels: ["Used", "Free"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
          borderWidth: 1,
          data: dtaArr,
        },
      ],
    });
  }
  
function randomDta() {
  let rndom = Math.floor(Math.random() * 100);
  let remain = 100 - rndom;
  return [rndom, remain];
}
  return (
    <CDBContainer>
      <h3 className="">{title}</h3>
      <Pie data={data} options={{ responsive: true }} />
    </CDBContainer>
  );
};

export default CPUDiagram;
