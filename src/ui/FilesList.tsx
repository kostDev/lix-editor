import {Container, FormControl, VStack} from "@chakra-ui/react";
import FileItem from "./FileItem.tsx";
import {useSearchStore} from "../stores/SearchStore.ts";

// interface Props {
//   filenames: string[];
// }

function FilesList() {
  const files = useSearchStore((s) => s.filesMeta);

  return (
    <Container
      color="white"
      overflow="auto"
      maxHeight="620px"
      mt={4}
      css={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      }}
      position="absolute"
      alignSelf="end"
      zIndex={2}
    >
      <FormControl>
        {
          files.length === 0 ? <></> : <VStack spacing={1} pt={2} align="start" w="100%">
            {files.map((file, idx) => (
              <FileItem idx={idx} key={`file:${file.name}-${idx}`} file={file} />
            ))}
          </VStack>
        }
      </FormControl>
    </Container>
  )
}

export default FilesList;