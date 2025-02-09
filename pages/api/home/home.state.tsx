import { MutableRefObject } from 'react';

import { Conversation, Message } from '@/types/chat';
import { ChatModeKey } from '@/types/chatmode';
import { FolderInterface } from '@/types/folder';
import { Prompt, PublicPrompt } from '@/types/prompt';
import { Llm, LlmID, LlmTemperature } from '@/types/llm';
import { Settings } from '@/types/settings';

export interface HomeInitialState {
  appName: string;
  apiKey: string;
  chatModeKeys: ChatModeKey[];
  loading: boolean;
  settings: Settings;
  messageIsStreaming: boolean;
  modelError: Error | null;
  models: Llm[];
  folders: FolderInterface[];
  publicFolders: FolderInterface[];
  conversations: Conversation[];
  selectedConversation: Conversation | undefined;
  currentMessage: Message | undefined;
  prompts: Prompt[];
  publicPrompts: PublicPrompt[];
  showChatbar: boolean;
  showPromptbar: boolean;
  currentFolder: FolderInterface | undefined;
  messageError: boolean;
  searchTerm: string;
  systemDefaultModelId: LlmID;
  defaultModelId: LlmID | undefined;
  defaultSystemPrompt: string;
  serverSideApiKeyIsSet: boolean;
  serverSidePluginKeysSet: boolean;
  stopConversationRef: MutableRefObject<boolean>;
  consumptionLimitEnabled: boolean;
  isAzureOpenAI: boolean;
  supportEmail: string;
  promptSharingEnabled: boolean;
}

export const initialState: Partial<HomeInitialState> = {
  appName: '',
  apiKey: '',
  loading: false,
  chatModeKeys: [],
  settings: {
    userId: '',
    theme: 'dark',
    defaultTemperature: LlmTemperature.NEUTRAL,
    defaultModelId: undefined,
    defaultSystemPrompt: '',
  },
  messageIsStreaming: false,
  modelError: null,
  models: [],
  folders: [],
  publicFolders: [],
  conversations: [],
  selectedConversation: undefined,
  currentMessage: undefined,
  prompts: [],
  publicPrompts: [],
  showPromptbar: true,
  showChatbar: true,
  currentFolder: undefined,
  messageError: false,
  searchTerm: '',
  systemDefaultModelId: undefined,
  defaultModelId: undefined,
  defaultSystemPrompt: '',
  serverSideApiKeyIsSet: false,
  serverSidePluginKeysSet: false,
  consumptionLimitEnabled: false,
  isAzureOpenAI: false,
  supportEmail: '',
  promptSharingEnabled: false,
};
