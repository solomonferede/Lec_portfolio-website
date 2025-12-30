import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    fetch(`${base}/blogs/${id}/`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [id]);

  if (loading) return <section className="section">Loading...</section>;
  if (!blog) return <section className="section">Not found</section>;

  const tags = (blog.tags || '').split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <section className="section">
      <div className="mb-4">
        <Link to="/blogs" className="text-sm text-brand-600 hover:underline">← Back to Blog</Link>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold">{blog.title}</h1>
      <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}
        {blog.author ? ` • ${blog.author}` : ''}
      </div>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-brand-600/10 text-brand-700 dark:text-brand-300 border border-brand-600/20">{t}</span>
          ))}
        </div>
      )}
      {blog.cover_image && (
        <div className="mt-6">
          {/* eslint-disable-next-line */}
          <img src={blog.cover_image} alt={blog.title} className="rounded-xl border border-slate-200/60 dark:border-slate-800/60" />
        </div>
      )}
      <article className="prose dark:prose-invert mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }}></article>
    </section>
  );
}


