import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogCard } from './Blogs.jsx';

export default function RecentPosts() {
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
          }))
          .slice(0, 3);
        setBlogs(normalized);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <section id="recent-posts" className="section">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Recent Posts</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Latest writing and updates</p>
        </div>
        <Link to="/blogs" className="text-brand-600 hover:underline">View all</Link>
      </div>
      {loading ? (
        <div className="text-slate-500 dark:text-slate-400">Loading posts...</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {blogs.map((b, i) => (
            <div key={b.id}>
              <BlogCard blog={b} i={i} />
              <div className="mt-2">
                <Link to={`/blogs/${b.id}`} className="text-sm text-brand-600 hover:underline">Read more</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}


