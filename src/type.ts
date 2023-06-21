export type MessageCount = {
  count: string;
  timeBucket: string;
  channelId: string;
};

export type Channel = {
  label: string;
  value: string;
  type: number;
  guild: string;
  guildId: string;
  parentId?: string | null;
  permissionOverwrites?: unknown[];
  messages?: unknown[];
  threads?: unknown[];
  nsfw?: boolean;
  id: string;
  name: string;
  rawPosition?: number;
  topic?: string | null;
  lastMessageId?: string | null;
  rateLimitPerUser?: number;
  createdTimestamp: number;
};
