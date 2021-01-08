export type Action = {
  type: string;
  updateState: (state: State) => State;
  detail?: any;
};

export type Player = {
  name: string;
  carts: string[];
  ishow: string[];
  ithink: string[];
}

export type State = {
  version: string;
  players: Player[];
  withWeapon?: string;
  guestKilled?: string;
  inRoom?: string;
}
