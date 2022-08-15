import { set } from "lodash";
import React, { useState, useEffect, useCallback } from "react";
import { axiosClient } from '../setup/axiosClient'

export default function useFetch(url, defaultValue = null) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    axiosClient.get(url).then((data) => {
      setData(data);
    }).catch((error) => {setError(error)});
  }, [url]);

  return [data || defaultValue, error];
}
