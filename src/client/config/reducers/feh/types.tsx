export enum ActionType {
  SET_HEROES = 'SET_HEROES',
}

export type Hero = {
  name: string;
};

export type FehState = {
  heroes: Hero[];
};

type SetHeroesAction = {
  type: typeof ActionType.SET_HEROES;
  heroes: Hero[];
};

export type FehActionTypes = SetHeroesAction;
