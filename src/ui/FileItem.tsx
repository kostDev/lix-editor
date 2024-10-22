import {chakra, HStack, Icon, Text} from "@chakra-ui/react";
import getFileIcon from "../utils/getIconByFiletype.ts";
import {memo } from "react";
import { motion } from "framer-motion";
import {useSearchStore} from "../stores/SearchStore.ts";
import {FileMetadata} from "../types/files";
import {useFilesStore} from "../stores/FilesStore.ts";

interface Props {
  idx: number;
  file: FileMetadata;
}

function FileItem(props: Props) {
  const { name, formattedSize, formattedModified, is_dir, directory_path } = props.file;
  const loadFilesByPath = useSearchStore(s => s.loadFilesByPath);
  const loadFileContent = useFilesStore(s => s.loadFileContent);
  // @ts-ignore
  const MotionHStack = motion(chakra(HStack));
  // console.log('render', props.filename);
  const handleClick = () => {
    if(is_dir) loadFilesByPath(name, true);
    else loadFileContent(directory_path, name);
  }


  return (
    <MotionHStack
      p={2}
      w="100%"
      borderWidth="0"
      borderRadius="md"
      _hover={{bg: 'white', color: 'blackAlpha.800', cursor: 'pointer'}}
      position="relative"
      initial={{ opacity: 0, y: 20 }}  // Початкова позиція
      animate={{ opacity: 1, y: 0 }}   // Анімація появи
      transition={{ duration: 0.2, delay: props.idx * 0.075 }}  // Тривалість і затримка
      onClick={handleClick}
    >
      <Icon as={getFileIcon(props.file)} boxSize={4}/>
      <Text>{name}</Text>
      {/* only for file show size */}
      { is_dir ? <></> :
        <Text position="absolute" right="3" fontSize={10} color="gray">
          {formattedModified.toLocaleDateString()} {formattedModified.toLocaleTimeString()} | {formattedSize}
        </Text>
      }
    </MotionHStack>
  );
}

export default memo(FileItem);