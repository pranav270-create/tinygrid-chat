import { DEFAULT_CHAT_TEMPERATURE } from '@/tinygrid-client';

export const useSettingsDefaults = () => {
  return {
    preamble: '',
    temperature: DEFAULT_CHAT_TEMPERATURE,
    tools: [],
  };
};
