import {chakra, VStack} from "@chakra-ui/react";
import {useFilesStore} from "../stores/FilesStore.ts";


const LineNumber = chakra('span');

function EditorLines() {
  const lines = useFilesStore(s => s.lines);

  return (
    <VStack
      align="end"
      spacing={0}
      px={2}
      borderRight="1px"
      borderColor="whiteAlpha.100"
      userSelect="none"
      // ref={lineNumbersRef}
      overflow="hidden"
    >
      {lines.map((line) => (
        <LineNumber
          key={`code-line-${line}`}
          fontSize="0.75rem"
          fontFamily="monospace"
          color="whiteAlpha.600"
          lineHeight="1.5em"
        >
          {line}
        </LineNumber>
      ))}
    </VStack>
  )
}

export default EditorLines;