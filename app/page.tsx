import { supabase } from "../lib/supabase";

export default async function Home() {
  const { data, error } = await supabase
    .from("pokemon_species")
    .select("*")
    .limit(20);

  if (error) {
    return <main>エラー: {error.message}</main>;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>PokeChoice</h1>

      <ul>
        {data?.map((pokemon) => (
          <li key={pokemon["図鑑No"]}>
            {pokemon["図鑑No"]}：{pokemon["名前（日本語）"]}
          </li>
        ))}
      </ul>
    </main>
  );
}