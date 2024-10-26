import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function PuzzleRow({ puzzle }) {
  const isComplete = puzzle.isComplete ? "Yes" : "No";
  return (
    <tr>
      <td>{puzzle.name}</td>
      <td>{puzzle.participants}</td>
      <td>{isComplete}</td>
    </tr>
  );
}

function PuzzleTable( {puzzles} ) {
  const table = (
    <table>
    <thead>
      <tr>
        <th>Puzzle Name</th>
        <th>Partner</th>
        <th>Completed</th>
      </tr>
        {
          puzzles.map( function(p)  {
            return (<PuzzleRow puzzle={p} key={p.name}/>)
          })
        }
      </thead>
    </table>
  )
  return table
}

function PuzzleTableParent( { puzzles }) {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        <div>
        <h1>Welcome, {user}!</h1>
        <PuzzleTable puzzles={puzzles} />
        </div>
      ) : (
        <h1>No access to this page</h1>
      )}
    </div>
  );
 
}

const PUZZLES = [
  {name: "First Puzzle", isComplete: false, participants: ["player1", "player2"]},
  {name: "Another Puzzle", isComplete: true, participants: ["player2", "player3"]},
  {name: "Mavlink Puzzle", isComplete: false, participants: ["player1", "player3"]}
]

function Dashboard() {
  return (
    <PuzzleTableParent puzzles={PUZZLES} />
  );
}
export default Dashboard;
