declare namespace Slack {
  type Channel = {
    id: string;
    name: string;
  };
}

declare type UserSettings = {
  hero: string;
  channel: string;
};

declare type Profile = {
  heroes: string[];
  channels: Slack.Channel[];
  settings: UserSettings;
};
