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

// Fetch motivational quote
export async function fetchMotivationalQuote(): Promise<Quote> {
  const target = encodeURIComponent('https://zenquotes.io/api/random');
  const response = await fetch(`https://api.allorigins.win/get?url=${target}`);
  
  if (!response.ok) throw new Error('Falha ao buscar frase motivacional');
  
  const wrapper = await response.json();
  const data = JSON.parse(wrapper.contents) as Quote[];
  return data[0];
}

// Fetch categories from DummyJSON products categories
export async function fetchCategories(): Promise<string[]> {
  const response = await fetch('https://dummyjson.com/products/categories');
  if (!response.ok) throw new Error('Falha ao buscar categorias');
  const data = (await response.json()) as Category[];
  return data.map((c) => c.name ?? c.slug);
}
