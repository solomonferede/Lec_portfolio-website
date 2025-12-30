import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function BlogCard({ blog, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="card p-5 hover:shadow-lg transition-shadow"
    >
      {blog.cover_image && (
        <div className="relative mb-4">
          <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
            <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      <h3 className="text-lg font-semibold">{blog.title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{blog.excerpt || blog.content.slice(0, 160) + '...'}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {blog.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full bg-brand-600/10 text-brand-700 dark:text-brand-300 border border-brand-600/20">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}
        {blog.author ? ` • ${blog.author}` : ''}
      </div>
      <div className="mt-4">
        <Link to={`/blogs/${blog.id}`} className="text-sm text-brand-600 hover:underline">Read more</Link>
      </div>
    </motion.article>
  );
}

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    fetch(`${base}/blogs/`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const normalized = (Array.isArray(data) ? data : [])
          .map((b) => ({
            id: b.id,
            title: b.title,
            excerpt: b.excerpt,
            content: b.content || '',
            author: b.author || '',
            published_at: b.published_at,
            tags: (b.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
            cover_image: b.cover_image,
          }));
        setBlogs(normalized);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <section id="blogs" className="section">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Blog</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Writings on engineering and systems</p>
        </div>
      </div>
      {loading ? (
        <div className="text-slate-500 dark:text-slate-400">Loading blogs...</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {blogs.map((b, i) => (
            <BlogCard key={b.id} blog={b} i={i} />
          ))}
        </div>
      )}
    </section>
  );
}


