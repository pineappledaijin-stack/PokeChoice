import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function PokemonPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q ?? "";

  let query = supabase
    .from("pokemon_species_view")
    .select("*")
    .order("dex_no", { ascending: true })
    .limit(100);

  if (q) {
    query = query.ilike("name_ja", `%${q}%`);
  }

  const { data, error } = await query;

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>エラー</h1>
        <pre>{error.message}</pre>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>PokeChoice</h1>
      <h2>ポケモン一覧</h2>

      <form>
        <input name="q" defaultValue={q} placeholder="ポケモン名で検索" />
        <button type="submit">検索</button>
      </form>

      <ul>
        {data?.map((pokemon) => (
          <li key={pokemon.dex_no}>
            <Link href={`/pokemon/${pokemon.dex_no}`}>
              No.{pokemon.dex_no} {pokemon.name_ja}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
