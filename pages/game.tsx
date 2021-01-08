/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { connect } from 'react-redux';
import { Player, State } from 'types';
import {
  HasEnable,
  HasDisable,
  ShowEnable,
  ShowDisable,
  IThinkEnable,
  IThinkDisable,
  Clear,
  SetGuestKilled,
  SetWithWeapon,
  SetInRoom,
} from 'stateUpdaters';
import strings from 'strings';

const BLOCK_HEIGHT = '60px';
const BLOCK_WIDTH = '140px';
const BLOCK_WIDTH_LEFT = '120px';

interface Props {
  players: Player[];
  hasEnable: (player: Player, card: string) => void;
  hasDisable: (player: Player, card: string) => void;
  showEnable: (player: Player, card: string) => void;
  showDisable: (player: Player, card: string) => void;
  iThinkEnable: (player: Player, card: string) => void;
  iThinkDisable: (player: Player, card: string) => void;
  clear: () => void;
  setGuestKilled: (card: string) => void;
  setWithWeapon: (card: string) => void;
  setInRoom: (card: string) => void;
  withWeapon?: string;
  guestKilled?: string;
  inRoom?: string;
}

const guests = [
  'mustard',
  'plum',
  'green',
  'peacock',
  'scarlet',
  'white',
];

const weapons = [
  'knife',
  'candlestick',
  'pistol',
  'poison',
  'trophy',
  'rope',
  'bat',
  'ax',
  'dumbbell',
];

const rooms = [
  'hall',
  'diningRoom',
  'kitchen',
  'patio',
  'observatory',
  'theater',
  'livingRoom',
  'spa',
  'guestHouse',
];

const Game = ({
  players,
  hasEnable,
  hasDisable,
  showEnable,
  showDisable,
  iThinkEnable,
  iThinkDisable,
  clear,
  setGuestKilled,
  setWithWeapon,
  setInRoom,
  withWeapon,
  guestKilled,
  inRoom,
}: Props) => {
  console.log('ciao');
  return (
    <div>
      <div className="sheet">
        <div className="cards">
          <p>{strings.get().cards}</p>
          <div className="block-title-left">
            <p>{strings.get().guests.title}</p>
          </div>
          {guests.map((guest) => {
            const win = guest === guestKilled;
            const isNo = players.find((player) => player.carts.includes(guest));
            const isThink = players.find((player) => player.ithink.includes(guest));
            const iShow = players.find((player) => player.ishow.includes(guest));
            return (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div
                className={`block-left ${win && 'win'} ${!win && isNo && 'no'} ${!win && isThink && 'think'} ${!win && iShow && 'show'}`}
                onClick={() => {
                  setGuestKilled(guest);
                }}
              >
                {/* @ts-ignore */}
                <p>{strings.get().guests[guest]}</p>
                <p>
                  (
                  {players.find((player) => player.carts.includes(guest))?.name
                  || players.find((player) => player.ithink.includes(guest))?.name}
                  )
                </p>
              </div>
            );
          })}
          <div className="block-title-left">
            <p>{strings.get().weapons.title}</p>
          </div>
          {weapons.map((weapon) => {
            const win = weapon === withWeapon;
            const isNo = players.find((player) => player.carts.includes(weapon));
            const isThink = players.find((player) => player.ithink.includes(weapon));
            return (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div
                className={`block-left ${win && 'win'} ${!win && isNo && 'no'} ${!win && isThink && 'think'}`}
                onClick={() => {
                  setWithWeapon(weapon);
                }}
              >
                {/* @ts-ignore */}
                {strings.get().weapons[weapon]}
                <p>
                  (
                  {players.find((player) => player.carts.includes(weapon))?.name
                    || players.find((player) => player.ithink.includes(weapon))?.name}
                  )
                </p>
              </div>
            );
          })}
          <div className="block-title-left">
            <p>{strings.get().rooms.title}</p>
          </div>
          {rooms.map((room) => {
            const win = room === inRoom;
            const isNo = players.find((player) => player.carts.includes(room));
            const isThink = players.find((player) => player.ithink.includes(room));
            return (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div
                className={`block-left ${win && 'win'} ${!win && isNo && 'no'} ${!win && isThink && 'think'}`}
                onClick={() => {
                  setInRoom(room);
                }}
              >
                {/* @ts-ignore */}
                {strings.get().rooms[room]}
                <p>
                  (
                  {players.find((player) => player.carts.includes(room))?.name
                    || players.find((player) => player.ithink.includes(room))?.name}
                  )
                </p>
              </div>
            );
          })}
        </div>
        <div className="space">
          <div className="player" />
        </div>
        <div className="scroller">
          {players.map((player) => (
            <div className="player">
              <p>{player.name}</p>
              <div className="block-title">
                <p>{player.name}</p>
              </div>
              {guests.map((guest) => block(
                player.carts.includes(guest),
                player.ishow.includes(guest),
                player.ithink.includes(guest),
                (selected: boolean) => {
                  if (selected) {
                    hasEnable(player, guest);
                  } else {
                    hasDisable(player, guest);
                  }
                },
                (selected: boolean) => {
                  if (selected) {
                    showEnable(player, guest);
                  } else {
                    showDisable(player, guest);
                  }
                },
                (selected: boolean) => {
                  if (selected) {
                    iThinkEnable(player, guest);
                  } else {
                    iThinkDisable(player, guest);
                  }
                },
              ))}
              <div className="block-title">
                <p>{player.name}</p>
              </div>
              {weapons.map((weapon) => block(
                player.carts.includes(weapon),
                player.ishow.includes(weapon),
                player.ithink.includes(weapon),
                (selected: boolean) => {
                  if (selected) {
                    hasEnable(player, weapon);
                  } else {
                    hasDisable(player, weapon);
                  }
                },
                (selected: boolean) => {
                  if (selected) {
                    showEnable(player, weapon);
                  } else {
                    showDisable(player, weapon);
                  }
                },
                (selected: boolean) => {
                  if (selected) {
                    iThinkEnable(player, weapon);
                  } else {
                    iThinkDisable(player, weapon);
                  }
                },
              ))}
              <div className="block-title">
                <p>{player.name}</p>
              </div>
              {rooms.map((room) => block(
                player.carts.includes(room),
                player.ishow.includes(room),
                player.ithink.includes(room),
                (selected: boolean) => {
                  if (selected) {
                    hasEnable(player, room);
                  } else {
                    hasDisable(player, room);
                  }
                },
                (selected: boolean) => {
                  if (selected) {
                    showEnable(player, room);
                  } else {
                    showDisable(player, room);
                  }
                },
                (selected: boolean) => {
                  if (selected) {
                    iThinkEnable(player, room);
                  } else {
                    iThinkDisable(player, room);
                  }
                },
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className="reset"
        onClick={() => {
          const sure = confirm(strings.get().sure);
          sure && clear();
        }}
      >
        reset
      </button>
      <style jsx>
        {`
        .cards {
          width: ${BLOCK_WIDTH_LEFT};
          background-color: #FAFAFA;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .player {
          width: ${BLOCK_WIDTH};
          background-color: #E0E0E0;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 10px;
        }
        .sheet {
          display: flex;
          flex-direction: row;
          overflow-x: hidden;
          overflow-y: hidden;
        }
        .block {
          height: ${BLOCK_HEIGHT};
          width: ${BLOCK_WIDTH};
        }
        .block-left {
          height: ${BLOCK_HEIGHT};
          width: ${BLOCK_WIDTH_LEFT};
          padding-left: 10px;
          border-style: dashed;
          border-color: transparent;
        }
        .block-title {
          height: ${BLOCK_HEIGHT};
          width: ${BLOCK_WIDTH};
          background-color: #64B5F6;
          align-items: center;
          justify-content: center;
          display: flex;
        }
        .block-title-left {
          height: ${BLOCK_HEIGHT};
          width: ${BLOCK_WIDTH_LEFT};
          background-color: #64B5F6;
          align-items: center;
          justify-content: center;
          display: flex;
        }
        .scroller {
          display: flex;
          flex-direction: row;
          overflow-x: scroll;
          overflow-y: hidden;
        }
        .space {
          width: 0px;
        }
        .no {
          background-color: #E57373 !important;
        }
        .think {
          background-color: #D4E157;
        }
        .show {
          border-color: #FFF176;
        }
        p {
          margin: 0px;
        }
        .reset {
          margin: 40px;
        }
        .win {
          background-color: #81C784;
        }
        `}
      </style>
    </div>
  );
};

const block = (
  has: boolean,
  show: boolean,
  ithink: boolean,
  setHas: (value: boolean) => void,
  setShow: (value: boolean) => void,
  setIThink: (value: boolean) => void,
) => (
  <div className="block">
    <div className="row">
      <input
        type="checkbox"
        checked={has}
        onChange={(e) => {
          setHas(e.target.checked);
        }}
      />
      <label>
        {strings.get().has}
      </label>
    </div>
    <div className="row">
      <input
        type="checkbox"
        checked={show}
        onChange={(e) => {
          setShow(e.target.checked);
        }}
      />
      <label>
        {strings.get().show}
      </label>
    </div>
    <div className="row">
      <input
        type="checkbox"
        checked={ithink}
        onChange={(e) => {
          setIThink(e.target.checked);
        }}
      />
      <label>
        {strings.get().think}
      </label>
    </div>
    <style jsx>
      {`
      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 60px;
      }
      .block {
        height: ${BLOCK_HEIGHT};
        width: ${BLOCK_WIDTH};
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 7px;
      }
      label {
        padding-left: 5px;
      }
      `}
    </style>
  </div>
);

const mapStateToProps = (state: State) => ({
  players: state.players,
  withWeapon: state.withWeapon,
  guestKilled: state.guestKilled,
  inRoom: state.inRoom,
});

const mapDispatchToProps = (dispatch: any) => ({
  hasEnable: (player: Player, card: string) => dispatch(HasEnable(player, card)),
  hasDisable: (player: Player, card: string) => dispatch(HasDisable(player, card)),
  showEnable: (player: Player, card: string) => dispatch(ShowEnable(player, card)),
  showDisable: (player: Player, card: string) => dispatch(ShowDisable(player, card)),
  iThinkEnable: (player: Player, card: string) => dispatch(IThinkEnable(player, card)),
  iThinkDisable: (player: Player, card: string) => dispatch(IThinkDisable(player, card)),
  clear: () => dispatch(Clear()),
  setGuestKilled: (card: string) => dispatch(SetGuestKilled(card)),
  setWithWeapon: (card: string) => dispatch(SetWithWeapon(card)),
  setInRoom: (card: string) => dispatch(SetInRoom(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
