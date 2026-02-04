import { Link } from "react-router";

export default function Error() {
  return (
    <div>
      <h1>Uh oh...</h1>
      <h2>Something must have went wrong :(</h2>
      <Link to="/">
        <button>Return to homepage</button>
      </Link>
    </div>
  );
}
