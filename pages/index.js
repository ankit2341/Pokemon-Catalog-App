import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import * as styles from "../styles/Home.module.css";
// const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/router";

const COUNTRIES_QUERY = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export default function Home() {
  const [offset, setOffset] = useState(20);
  const [page, setPage] = useState(1);
  const [pokemonData, setPokemonData] = useState([]);
  const router = useRouter();
  const { data, loading, error, fetchMore } = useQuery(COUNTRIES_QUERY, {
    variables: { first: 60 },
  });

  if (loading) {
    return (
      <>
        <nav className={styles.navbar}>
          <div>
            <img
              src="https://assets.stickpng.com/images/612ce4761b9679000402af1c.png"
              alt="POKEMON"
            />
          </div>
          <div>
            <button className={styles.homeBtn}>Go To Home</button>
          </div>
        </nav>
        <div style={{ width: "100%", height: "100px" }}></div>
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </>
    );
  }
  if (error) return `Error! ${error.message}`;

  const handleRefetch = async () => {
    let firstdata = page * 20 + 60;
    const pokemonDataFetch = await fetchMore({
      variables: {
        first: firstdata,
      },
    });
    setPokemonData(pokemonDataFetch.data.pokemons);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <img
            src="https://assets.stickpng.com/images/612ce4761b9679000402af1c.png"
            alt="POKEMON"
          />
        </div>
        <div>
          <button className={styles.homeBtn}>Go To Home</button>
        </div>
      </nav>
      <div style={{ width: "100%", height: "100px" }}></div>
      <div
        style={{ background: "#fff" }}
        className="w-11/12 m-auto grid grid-cols-4 gap-4 md:grid-cols-4"
      >
        {pokemonData.length > 0
          ? pokemonData.map((pokemon) => {
              return (
                <div
                  key={pokemon.id}
                  onClick={() => router.push(`/pokemon/${pokemon.id}`)}
                  className="max-w-sm rounded overflow-hidden shadow-lg"
                >
                  <img
                    className="w-full h-60"
                    src={pokemon.image}
                    alt="Sunset in the mountains"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{pokemon.name}</div>
                    <p className="text-gray-700 text-base">
                      {pokemon.classification}{" "}
                    </p>
                  </div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Types</div>
                    <div className="px-6 pt-4 pb-2">
                      {pokemon.types.map((el) => {
                        return (
                          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            {el}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          : data.pokemons.map((pokemon) => {
              return (
                <div
                  key={pokemon.id}
                  onClick={() => router.push(`/pokemon/${pokemon.id}`)}
                  className="max-w-sm rounded overflow-hidden shadow-lg"
                >
                  <img
                    className="w-full h-60"
                    src={pokemon.image}
                    alt="Sunset in the mountains"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{pokemon.name}</div>
                    <p className="text-gray-700 text-base">
                      {pokemon.classification}{" "}
                    </p>
                  </div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Types</div>
                    <div className="px-6 pt-4 pb-2">
                      {pokemon.types.map((el) => {
                        return (
                          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            {el}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <div className="flex align-center justify-center mb-6 mt-6">
        <button
          className={styles.pagination_btn}
          onClick={() => {
            setPage((page) => page + 1);
            handleRefetch();
          }}
        >
          Load more
        </button>
      </div>
    </>
  );
}
