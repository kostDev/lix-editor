import {Box} from "@chakra-ui/react";
import FilesList from "./ui/FilesList.tsx";
import CurrPathValue from "./ui/CurrPathValue.tsx";
import BottomPanel from "./ui/BottomPanel.tsx";
import Editor from "./ui/Editor.tsx";
import useHotkeys from "./hooks/useHotkeys.ts";
// import FullScreenShader from "./ui/special/FullScreenShader.tsx";

// Tauri commands at https://tauri.app/develop/calling-rust/
function App() {
  // console.log('render APP')
  useHotkeys();

  return (
    <Box
      role="main"
      display="flex"
      flexDirection="column"
      bg="#212121"
      height="100vh"
      width="100vw"
      fontFamily="monospace"
    >
      <CurrPathValue />
      {/* FILENAMES LIST */}
      <FilesList />
      {/* ------------- */}
      <BottomPanel />
      <Editor />
      {/*<FullScreenShader />*/}
    </Box>
  );
}

export default App;
