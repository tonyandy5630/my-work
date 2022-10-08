import { useEffect } from "react";
import QuoteItem from "../quotes/QuoteItem";
import classes from "../quotes/QuoteList.module.css";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import { getAllQuotes } from "../lib/api";
import QuoteList from "../quotes/QuoteList";
import NoQuoteFound from "../quotes/NoQuotesFound";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuoteFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
