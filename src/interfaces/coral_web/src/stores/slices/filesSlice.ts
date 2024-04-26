import { StateCreator } from 'zustand';

import { File as CohereFile } from '@/tinygrid-client';

import { StoreState } from '..';

const INITIAL_STATE: State = {
  isFileInputQueuedToFocus: false,
  uploadingFiles: [],
  composerFiles: [],
};

export interface UploadingFile {
  id: string;
  file: File;
  error?: string;
  progress: number;
}

type State = {
  isFileInputQueuedToFocus: boolean;
  uploadingFiles: UploadingFile[];
  composerFiles: CohereFile[];
};

type Actions = {
  queueFocusFileInput: () => void;
  clearFocusFileInput: () => void;
  addUploadingFile: (file: UploadingFile) => void;
  addComposerFile: (file: CohereFile) => void;
  updateUploadingFileError: (file: UploadingFile, error: string) => void;
  deleteUploadingFile: (id: string) => void;
  deleteComposerFile: (id: string) => void;
  clearComposerFiles: () => void;
};

export type FilesStore = {
  files: State;
} & Actions;

export const createFilesSlice: StateCreator<StoreState, [], [], FilesStore> = (set) => ({
  queueFocusFileInput() {
    set((state) => ({
      files: {
        ...state.files,
        isFileInputQueuedToFocus: true,
      },
    }));
  },
  clearFocusFileInput() {
    set((state) => ({
      files: {
        ...state.files,
        isFileInputQueuedToFocus: false,
      },
    }));
  },
  addUploadingFile(file) {
    set((state) => ({
      files: {
        ...state.files,
        uploadingFiles: [...state.files.uploadingFiles, file],
      },
    }));
  },
  addComposerFile(file) {
    set((state) => ({
      files: {
        ...state.files,
        composerFiles: [...state.files.composerFiles, file],
      },
    }));
  },
  updateUploadingFileError(file, error) {
    set((state) => {
      const newUploadingFiles = [...state.files.uploadingFiles];
      const uploadingFile = newUploadingFiles.find((f) => f.id === file.id);
      if (uploadingFile) {
        uploadingFile.error = error;
        return {
          files: {
            ...state.files,
            uploadingFiles: newUploadingFiles,
          },
        };
      }

      return {};
    });
  },
  deleteUploadingFile(id) {
    set((state) => ({
      files: {
        ...state.files,
        uploadingFiles: state.files.uploadingFiles.filter((f) => f.id !== id),
      },
    }));
  },
  deleteComposerFile(id) {
    set((state) => ({
      files: {
        ...state.files,
        composerFiles: state.files.composerFiles.filter((f) => f.id !== id),
      },
    }));
  },
  clearComposerFiles() {
    set((state) => ({
      files: {
        ...state.files,
        composerFiles: [],
      },
    }));
  },
  files: INITIAL_STATE,
});
