import type { Action, State, Player } from 'types';

export const SetPlayers = (players: Player[]): Action => ({
  type: 'SetPlayers',
  updateState: (state: State) => ({
    ...state,
    players,
  }),
});

export const HasEnable = (player: Player, card: string): Action => ({
  type: 'HasEnable',
  updateState: (state: State) => ({
    ...state,
    players: state.players.map((playerState: Player) => {
      if (playerState.name !== player.name) {
        return playerState;
      }

      return {
        ...playerState,
        carts: [...playerState.carts, card],
      };
    }),
  }),
});

export const HasDisable = (player: Player, card: string): Action => ({
  type: 'HasDisable',
  updateState: (state: State) => ({
    ...state,
    players: state.players.map((playerState: Player) => {
      if (playerState.name !== player.name) {
        return playerState;
      }

      return {
        ...playerState,
        carts: playerState.carts.filter((cardState) => cardState !== card),
      };
    }),
  }),
});

export const ShowEnable = (player: Player, card: string): Action => ({
  type: 'ShowEnable',
  updateState: (state: State) => ({
    ...state,
    players: state.players.map((playerState: Player) => {
      if (playerState.name !== player.name) {
        return playerState;
      }

      return {
        ...playerState,
        ishow: [...playerState.ishow, card],
      };
    }),
  }),
});

export const ShowDisable = (player: Player, card: string): Action => ({
  type: 'ShowDisable',
  updateState: (state: State) => ({
    ...state,
    players: state.players.map((playerState: Player) => {
      if (playerState.name !== player.name) {
        return playerState;
      }

      return {
        ...playerState,
        ishow: playerState.ishow.filter((cardState) => cardState !== card),
      };
    }),
  }),
});

export const IThinkEnable = (player: Player, card: string): Action => ({
  type: 'IThinkEnable',
  updateState: (state: State) => ({
    ...state,
    players: state.players.map((playerState: Player) => {
      if (playerState.name !== player.name) {
        return playerState;
      }

      return {
        ...playerState,
        ithink: [...playerState.ithink, card],
      };
    }),
  }),
});

export const IThinkDisable = (player: Player, card: string): Action => ({
  type: 'IThinkDisable',
  updateState: (state: State) => ({
    ...state,
    players: state.players.map((playerState: Player) => {
      if (playerState.name !== player.name) {
        return playerState;
      }

      return {
        ...playerState,
        ithink: playerState.ithink.filter((cardState) => cardState !== card),
      };
    }),
  }),
});

export const Clear = (): Action => ({
  type: 'Clear',
  updateState: (state: State) => ({
    ...state,
    players: state.players.map((playerState: Player) => ({
      ...playerState,
      ithink: [],
      carts: [],
      ishow: [],
    })),
    guestKilled: undefined,
    withWeapon: undefined,
    inRoom: undefined,
  }),
});

export const SetGuestKilled = (guestKilled: string): Action => ({
  type: 'SetGuestKilled',
  updateState: (state: State) => ({
    ...state,
    guestKilled: state.guestKilled !== guestKilled ? guestKilled : undefined,
  }),
});

export const SetWithWeapon = (withWeapon: string): Action => ({
  type: 'SetWithWeapon',
  updateState: (state: State) => ({
    ...state,
    withWeapon: state.withWeapon !== withWeapon ? withWeapon : undefined,
  }),
});

export const SetInRoom = (inRoom: string): Action => ({
  type: 'SetInRoom',
  updateState: (state: State) => ({
    ...state,
    inRoom: state.inRoom !== inRoom ? inRoom : undefined,
  }),
});
