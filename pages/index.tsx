import {
  useState,
  SetStateAction,
  Dispatch,
} from 'react';
import { Player } from 'types';
import { useRouter } from 'next/router';
import { SetPlayers } from 'stateUpdaters';
import Head from 'next/head';
import { connect } from 'react-redux';
import strings from 'strings';

interface Props {
  setPlayers: (players: Player[]) => void;
}

const Home = ({
  setPlayers,
}: Props) => {
  const router = useRouter();

  const [players, setPlayersState]:
    [string[] | undefined, Dispatch<SetStateAction<string[] | undefined>>] = useState();
  const [currentName, setCurrentName] = useState('');

  return (
    <div>
      <Head>
        <title>Cluedo</title>
      </Head>
      <div>
        <p>{strings.get().home.players}</p>
        {players && players.map((player) => (
          <p>{player}</p>
        ))}
        <div>
          <input
            value={currentName}
            onChange={(e) => {
              setCurrentName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setPlayersState([...(players ?? []), currentName]);
              setCurrentName('');
            }}
          >
            {strings.get().home.addPlayer}
          </button>
        </div>
        <button
          onClick={() => {
            if (!players || players.length === 0) {
              alert('1 player needed');
            }

            const playersToState = players && players.filter((player) => player !== '').map((player) => ({
              name: player,
              carts: [],
              ishow: [],
              ithink: [],
            }));

            console.log(playersToState);

            playersToState && setPlayers(playersToState);

            router.push('/game');
          }}
        >
          {strings.get().home.play}
        </button>
      </div>
      <style jsx>
        {`
        `}
      </style>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setPlayers: (players: Player[]) => dispatch(SetPlayers(players)),
});

export default connect(undefined, mapDispatchToProps)(Home);
