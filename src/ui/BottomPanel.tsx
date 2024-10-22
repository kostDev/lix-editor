import {Box, Input} from "@chakra-ui/react";
import {useSearchStore} from "../stores/SearchStore.ts";
import React, {useState} from "react";

function BottomPanel() {
  const [path, setPath] = useState("");
  const loadFilesByPath = useSearchStore((s) => s.loadFilesByPath);
  // const updateSearchPath = useSearchStore((s) => s.updateSearchPath);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const newPath = (e.target as HTMLInputElement).value;
    if(e.key === "Enter") {
      // updateSearchPath(newPath);
      loadFilesByPath(newPath, false);
    }
  }

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPath = e.target.value;
    if(newPath != path) {
      setPath(newPath);
    }
  }

  return (
    <Box w="inherit" h="2.5rem" bg="black" position="absolute" bottom={0} zIndex={99}>
      <Box display="flex" gap={3}>
        <Input
          type="text"
          placeholder=":"
          onKeyDown={handleKeyPress}
          onChange={handlePathChange}
          spellCheck={false}
          border="none"
          borderRadius={0}
          color="lightGrey"
          boxShadow="none"
          sx={{ _focus: { boxShadow: "none" } }}
        />
      </Box>
    </Box>
  )
}

export default BottomPanel