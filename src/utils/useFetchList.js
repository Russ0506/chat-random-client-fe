import { set } from "lodash";
import { useState, useEffect, useCallback } from "react";
import { axiosClient } from '../setup/axiosClient'

export default function useFetchList({resourceType, params = {}, page, perPage = 20}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [outOfPage, setOutOfPage] = useState(false);

  const url = () => {
    switch(resourceType) {
      case "message":
        return `conversations/${params.conversationId}/messages?page=${page}&per_page=${perPage}`;
      case "conversation":
        return ""
      default:
        return ""
    }
  }

  const fetchNewPage = useCallback(async () => {
    try {
      if (page === undefined || params.conversationId === undefined) return
      await setLoading(true);
      await setError(false);
      const res = await axiosClient.get(url()).then((data) => {
        setList((prev) => [...prev, ...data]);
        if (data.length === 0) setOutOfPage(true);
        setLoading(false);
      });
    } catch (err) {
      setError(err);
    }
  }, [page, params]);

  useEffect(() => {
    if (page === 1) {
      setList([]);
    }
    fetchNewPage();
  }, [page, params.conversationId]);

  return [list, loading, outOfPage];
}
