import React, { useEffect, useLayoutEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { CDBContainer } from "cdbreact";
import moment from "moment";
Chart.register(...registerables);

const FrequenceDiagram = () => {
  const [tmDta, setTmDta] = useState([]);
  const [requestCnt, setRequestCnt] = useState([]);
  const [data, setData] = useState({
    labels: tmDta,
    datasets: [
      {
        label: "Requested Monitoring",
        backgroundColor: "rgba(71, 225, 167, 0.5)",
        borderColor: "rgb(71, 225, 167)",
        data: requestCnt,
      },
    ],
  });

  useEffect(() => {
    reRenderRequestDiagram();
    setInterval(() => {
      reRenderRequestDiagram();
    }, 60 * 1000);
  }, []);

  function reRenderRequestDiagram() {
    setTmDta((tmDta.length = 0));
    setRequestCnt((requestCnt.length = 0));
    let current = new Date();
    let crrTm = current.getHours();
    let cnt = 0;
    while (cnt < 10) {
      cnt++;
      if (crrTm == 0) {
        setTmDta(tmDta.unshift(crrTm + "h"));
        setRequestCnt(requestCnt.unshift(Math.floor(Math.random() * 100)));
        crrTm = 23;
        while (cnt < 10) {
          setTmDta(
            tmDta.unshift(
              crrTm +
                "h" +
                ", " +
                moment(new Date(new Date() - 1)).format("DD-MM-YYYY")
            )
          );
          setRequestCnt(requestCnt.unshift(Math.floor(Math.random() * 100)));
          crrTm--;
          cnt++;
        }
      } else {
        setTmDta(tmDta.unshift(crrTm + "h"));
        setRequestCnt(requestCnt.unshift(Math.floor(Math.random() * 100)));
        crrTm--;
      }
      resetDataRequestDiagram(tmDta, requestCnt);
    }
  }

  function resetDataRequestDiagram(dataNmArr, dataValArr) {
    setData({
      labels: dataNmArr,
      datasets: [
        {
          label: "Requested Monitoring",
          backgroundColor: "rgba(71, 225, 167, 0.5)",
          borderColor: "rgb(71, 225, 167)",
          data: dataValArr,
        },
      ],
    });
  }

  return (
    <CDBContainer>
      <h3 className="mt-5">Frequence Monitoring</h3>
      <Bar data={data} options={{ responsive: true }} />
    </CDBContainer>
  );
};

export default FrequenceDiagram;
