import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAll, getBaseUrl } from '../utils/api.js';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchAll('/blogs/')
      .then((data) => {
        if (!isMounted) return;
        const found = Array.isArray(data) ? data.find((b) => b.slug === slug) : null;
        if (found) {
          const base = getBaseUrl().replace('/api', '');
          setBlog({
            ...found,
            cover_image: found.cover_image
              ? (found.cover_image.startsWith('http') ? found.cover_image : `${base}${found.cover_image}`)
              : null,
          });
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch blog:', error);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [slug]);

  if (loading) return <section className="section">Loading...</section>;
  if (!blog) return <section className="section">Blog post not found</section>;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="section">
      <div className="mb-4">
        <Link to="/blog" className="text-sm text-brand-600 hover:underline">
          ← Back to Blog
        </Link>
      </div>

      {blog.cover_image && (
        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden mb-6">
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
        {blog.published_at && <span>{formatDate(blog.published_at)}</span>}
        {blog.author && <span>By {blog.author}</span>}
      </div>

      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </section>
  );
}

