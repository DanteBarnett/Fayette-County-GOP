import Container from './ui/Container';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from './ui/Spinner';

type Article = { title: string; link: string; isoDate?: string };

export default function NewsSection() {
  const { data, isLoading } = useQuery<Article[]>({
    queryKey: ['news'],
    queryFn: () => axios.get('/static/mockData.json').then((res) => res.data.news as Article[]),
  });

  return (
    <section id="news" className="bg-gray-50 py-24">
      <Container>
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Latest News</h2>
        {isLoading && <Spinner />}
        {data && (
          <div className="space-y-6">
            {data.map((article) => (
              <a
                key={article.link}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold">{article.title}</h3>
                {article.isoDate && (
                  <p className="text-sm text-gray-500">
                    {new Date(article.isoDate).toLocaleDateString()}
                  </p>
                )}
              </a>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}