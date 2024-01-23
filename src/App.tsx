import { useEffect, useState } from "react";
import { IAppInputData } from "./types";
import { Alert, AlertTitle, LinearProgress } from "@mui/material";
import useGetAxios from "./hooks/useGetAxios";

interface IAppProps {
  inputData: IAppInputData;
}
function App({ inputData }: IAppProps) {
  const [html, setHtml] = useState<string>("");
  const { response, isLoading, error } = useGetAxios<string>(inputData.dataContentLink);
  console.log(response);

  useEffect(() => {
    response && setHtml(response);
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
