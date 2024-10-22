import {Box, Text} from "@chakra-ui/react";
import {useSearchStore} from "../stores/SearchStore.ts";

function CurrPathValue() {
  const path = useSearchStore(s => s.currPath);

  return (
    <Box w="auto" bg="black" position="absolute" top={0} right={0} opacity={0.5}>
      <Text px={2} textAlign="right" color="gold">{path} :open</Text>
    </Box>
  );
}

export default CurrPathValue;