import { StateCreator } from 'zustand';

import { Document } from '@/tinygrid-client';

import { StoreState } from '..';

const INITIAL_STATE: State = {
  citationReferences: {},
  hasCitations: false,
  selectedCitation: null,
  hoveredGenerationId: null,
  searchResults: {},
};

type Citation = {
  generationId: string;
  start: string;
  end: string;
  /** Used to scroll to highlight position */
  yPosition: number | null;
};

type CitationReferences = {
  [generationId: string]: {
    /** In the format: {startIndex}-{endIndex} */
    [startEndKey: string]: Document[];
  };
};

interface SearchResults {
  [documentId: string]: Record<string, any>;
}

type State = {
  citationReferences: CitationReferences;
  hasCitations: boolean;
  selectedCitation: Citation | null;
  hoveredGenerationId: string | null;
  searchResults: SearchResults;
};

type Actions = {
  addSearchResults: (results: Record<string, any>) => void;
  addCitation: (generationId: string, startEndKey: string, documents: Document[]) => void;
  selectCitation: (citation: Citation | null) => void;
  hoverCitation: (generationId: string | null) => void;
  resetCitations: VoidFunction;
};

export type CitationsStore = {
  citations: State;
} & Actions;

export const createCitationsSlice: StateCreator<StoreState, [], [], CitationsStore> = (set) => ({
  addSearchResults(results) {
    set((state) => {
      const newResults = { ...state.citations.searchResults };
      (results || []).forEach((result: any) => {
        (result?.documentIds ?? []).forEach((docId: string) => {
          newResults[docId] = result;
        });
      });
      return {
        citations: {
          ...state.citations,
          ...(results ? { searchResults: newResults } : {}),
        },
      };
    });
  },
  addCitation(generationId, startEndKey, documents) {
    set((state) => ({
      citations: {
        ...state.citations,
        citationReferences: {
          ...state.citations.citationReferences,
          [generationId]: {
            ...state.citations.citationReferences[generationId],
            [startEndKey]: documents,
          },
        },
        hasCitations: true,
      },
    }));
  },
  selectCitation(citation) {
    set((state) => ({
      citations: {
        ...state.citations,
        selectedCitation: citation,
      },
    }));
  },
  hoverCitation(generationId) {
    set((state) => ({
      citations: {
        ...state.citations,
        hoveredGenerationId: generationId,
      },
    }));
  },
  resetCitations() {
    set(() => ({
      citations: INITIAL_STATE,
    }));
  },
  citations: INITIAL_STATE,
});
