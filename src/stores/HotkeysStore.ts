import {create} from "zustand";
import {FileStatus, useFilesStore} from "./FilesStore.ts";


const initialState = {

}

interface HotkeysState {

  // in future give filename
  closeFile: () => void;
}

export const useHotkeysStore = create<HotkeysState>()(() => ({
  ...initialState,

  closeFile: () => {
    useFilesStore.getState().localUpdateFileContent('');
    useFilesStore.setState({ status: FileStatus.NONE });
  }
}));