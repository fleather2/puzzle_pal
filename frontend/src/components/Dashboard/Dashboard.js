import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function PuzzleRow( { puzzle }) {
  // TODO define puzzle with partnernames
  //const partnerName = puzzle;
  const isComplete = puzzle.isComplete ? "Yes" : "No";
  return (
    <tr>
      <td>{puzzle.name}</td>
      <td>{puzzle.participants}</td>
      <td>{isComplete}</td>
    </tr>
  );
}

function PuzzleTable( { puzzles }) {
  const rows = [];
  const { user } = useAuth();


  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <h1>No access to this page</h1>
      )}
    </div>
  );
  // puzzles.forEach( (puzzle) => {
  //   rows.push(
  //     <PuzzleRow puzzle={puzzle} />
  //   )
  // });
  // return (
  //   <table>
  //   <thead>
  //     <tr>
  //       <th>Puzzle Name</th>
  //       <th>Partner</th>
  //       <th>Completed</th>
  //     </tr>
  //     <tbody>{rows}</tbody>
  //   </thead>
  // </table>
}

const PUZZLES = [
  {name: "First Puzzle", isComplete: false, participants: ["player1", "player2"]},
  {name: "Another Puzzle", isComplete: true, participants: ["player2", "player3"]},
  {name: "Mavlink Puzzle", isComplete: false, participants: ["player1", "player3"]}
]

function Dashboard() {
  return (
    <PuzzleTable puzzles={PUZZLES} />
  );
}
export default Dashboard;
