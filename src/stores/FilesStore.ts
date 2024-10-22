import {create} from "zustand/index";
import {invoke} from "@tauri-apps/api/core";
import {FileContent} from "../types/files";
import {getLineNumbers} from "../utils/file.ts";

export enum FileStatus {
  NONE,
  OPEN,
  READ,
  WRITE
}

const initialState = {
  file: '' , //new Map(),
  lines: [],
  status: FileStatus.NONE,
}

interface FilesState {
  file: FileContent; // Map<string, FileContent>;
  lines: Array<number>;
  status: FileStatus;

  localUpdateFileContent: (content: FileContent) => void;
  loadFileContent: (directory: Required<string>, file_name: Required<string>) => Promise<void>;
}

export const useFilesStore = create<FilesState>()((set) => ({
  ...initialState,

  localUpdateFileContent: (content) => {
    set({ file: content, lines: getLineNumbers(content) });
  },

  loadFileContent: async (directory, fileName ) => {
    // const files = get().files;
    await invoke<FileContent | null>("get_file_content", { directory, fileName }).then((content) => {
      // console.log(content);
      content && set({ file: content, lines: getLineNumbers(content), status: FileStatus.OPEN });
      // files.set(directory + fileName, content);
      // set({ files });
    }).catch(console.error)
  }
}));