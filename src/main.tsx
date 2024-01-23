import { APP_NAME, IAppInputData } from './types/index.ts';
import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// import './translations/i18n';

//input data
let inputData: IAppInputData | undefined;

//error logs
let errorMessage = "";
// let error = false;

//find root element
const rootElement = document.getElementById(`${APP_NAME}-root`) as HTMLElement;
//if no root found
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  // //add styles
  // rootElement.style.width = '100%';
  // rootElement.style.height = '100%';

  //check for div and loading error
  const dal = "https://www.starcheck.sk/apijs/";
  const di = rootElement.getAttribute("data-id");
  const dm = rootElement.getAttribute("data-module");
  const dv = rootElement.getAttribute("data-version");
  const dcl = rootElement.getAttribute("data-content-link");
  if ((dal !== null) && (di !== null) && (dm !== null) && (dv !== null) && (dcl !== null)) {
    inputData = {
      dataApiLink: dal,
      dataId: di,
      dataModule: dm,
      dataVersion: dv,
      dataContentLink: dcl
    };
  } else {
    // error = true;
    errorMessage = `Some of required input data are missing!\n'data-id'=${di}\n'data-module'=${dm}\n'data-version'=${dv}\n'data-content-link'=${dcl}`;
    console.log(` ${errorMessage}`);
  }

  root.render(
    // <React.StrictMode>
    <Fragment>
      {inputData &&
        <App inputData={inputData} />
      }
    </Fragment>
    // </React.StrictMode>
  );
} else {
  // error = true;
  errorMessage = `Root node id '${APP_NAME}-root' not found!`;
  console.log(`${errorMessage}`);
}
