import { Helmet } from "react-helmet";

import DragNDrop from "./pages/DragNDrop";

function App() {
  return <>
    <Helmet>
      <title>Drag'n'Drop Demo</title>
    </Helmet>
    <DragNDrop />;
  </>
}

export default App;
