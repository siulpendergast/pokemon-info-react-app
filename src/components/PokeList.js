import axios from "axios";
import { useEffect, useState } from "react";

export default function PokeList() {
  const [pokemonChainList, setPokemonChainList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    getPokemonChainList();
  }, []);

  useEffect(() => {
    getPokemonList();
  }, [pokemonChainList]);

  const getPokemonChainList = () => {
    let url = "https://pokeapi.co/api/v2/evolution-chain?offset=66&limit=2";
    axios
      .get(url)
      .then((response) => {
        let evolutionChainList = response.data.results.map((element, index) => {
          element.idEvolutionChain = index;
          return element;
        });
        console.log(
          "evolutionChainList",
          JSON.stringify(evolutionChainList, undefined, 4)
        );
        setPokemonChainList(evolutionChainList);
      })
      .catch((error) => {
        console.log("Pokemon evolution chain list could not get.", error);
      });
  };

  const getPokemonList = () => {
    let species = [];
    let list = pokemonChainList.map((element, index) => {
      axios.get(element.url).then((response) => {
        species.push(getSpeciesFromEvolutionChain(response.data.chain));
        console.log(index, species);
      });
      console.log(species);
      return species;
    });
    setPokemonList(list);
  };

  const getSpeciesFromEvolutionChain = (dataEvolutionChain) => {
    let species = [];
    console.log(dataEvolutionChain);
    while (
      !!dataEvolutionChain &&
      dataEvolutionChain.hasOwnProperty("evolves_to")
    ) {
      species.push(dataEvolutionChain.species);

      // In case a species has more than one evolution
      // then we need to iterate over evolves_to
      let numberOfEvolutions = dataEvolutionChain["evolves_to"].length;

      if (numberOfEvolutions > 1) {
        for (let index = 1; index < numberOfEvolutions; index++) {
          species.push(dataEvolutionChain.evolves_to[index].species);
        }
      }

      dataEvolutionChain = dataEvolutionChain["evolves_to"][0];
    }

    // When we return 1, the function communicates to sort() that the object b
    // takes precedence in sorting over the object a.
    // Returning -1 would do the opposite.
    species.sort((a, b) => (a.url > b.url ? 1 : -1));

    return species;
  };

  return (
    <section>
      <div className="pokemon-list">
        <div className="family">
          <div className="gen">
            {pokemonChainList.map((element) => (
              <div>{element.idEvolutionChain}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
