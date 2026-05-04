export interface Quote {
  q: string;
  a: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  url: string;
}

export interface Quote {
  q: string;      // mantém a mesma interface — zero mudança no HomeScreen
  a: string;
}

export async function fetchMotivationalQuote(): Promise<Quote> {
  const response = await fetch('https://api.quotable.kurokeita.dev/api/quotes/random');

  if (!response.ok) throw new Error('Falha ao buscar frase motivacional');

  const data = await response.json();

  // Mapeia para o mesmo formato { q, a } que o HomeScreen já usa
  return {
    q: data.quote.content,
    a: data.quote.author.name,
  };
}

// Fetch categories from DummyJSON products categories
export async function fetchCategories(): Promise<string[]> {
  const response = await fetch('https://dummyjson.com/products/categories');
  if (!response.ok) throw new Error('Falha ao buscar categorias');
  const data = (await response.json()) as Category[];
  return data.map((c) => c.name ?? c.slug);
}