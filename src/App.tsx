import { useEffect, useState } from "react";
import { IAppInputData } from "./types";
import { Alert, LinearProgress } from "@mui/material";
import DOMPurify from "dompurify";
import useGetAxios from "./hooks/useGetAxios";

interface IAppProps {
  inputData: IAppInputData;
}
function App({ inputData }: IAppProps) {
  const [html, setHtml] = useState<string>("");
  const { response, isLoading, error } = useGetAxios<string>(inputData.dataContentLink);
  console.log(response);

  useEffect(() => {
    response && setHtml(DOMPurify.sanitize(response));
  }, [response]);

  return (
    isLoading ?
      <LinearProgress />
      :
      error ?
        <Alert severity="error" sx={{ margin: '0 auto' }}>
          Error Code: {error.code}<br />
          Message: {error.message}
          {error?.url && <><br />Url: {error?.url}</>}

        </Alert>
        :
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}

export default App;
