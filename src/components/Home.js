import Search from "./Search";
import PokeList from "./PokeList";

export default function Home() {
  return (
    <div className="App">
      <div className="content">
        <Search />
        <PokeList />
      </div>
    </div>
  );
}
