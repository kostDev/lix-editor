import {create} from "zustand";
import {invoke} from "@tauri-apps/api/core";
import {FileMetadata, ResFileMetadata} from "../types/files";
import {convertToDate, formatFileSizePro} from "../utils/file.ts";


const initialState = {
  currPath: '',
  filesMeta: [],
};

interface SearchState {
  currPath: string;
  filesMeta: Array<FileMetadata>;
  updateSearchPath: (currPath: string) => void;
  loadFilesByPath: (newPath: string, fromPos: boolean) => Promise<void>;
}

export const useSearchStore = create<SearchState>()((set, get) => ({
  ...initialState,


  updateSearchPath: (currPath) => {
    set({ currPath });
  },

  loadFilesByPath: async (newPath, fromPos = false) => {
    let currPath = get().currPath;
    if(currPath === newPath) return;
    currPath = fromPos ? `${currPath}/${newPath}` : newPath;

    await invoke<ResFileMetadata[]>("get_filenames_in_directory", { path: currPath })
      .then((resMetaFiles) => {
        // transform from ResFileMetadata to FileMetadata
        // mutate with new values: formattedSize, formattedModified
        const filesMeta = resMetaFiles.map<FileMetadata>(file => {
          return {
            ...file,
            formattedSize: formatFileSizePro(file.size, true),
            formattedModified: convertToDate(file.modified)
          } as FileMetadata;
        });

        set({ filesMeta, currPath });

        console.log('filesMeta:', filesMeta);
      }).catch(console.error);
  }
}))
