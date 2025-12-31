import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation.js';
import { fetchAll, getBaseUrl } from '../utils/api.js';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isRevealed] = useScrollReveal();
  const [containerRef, revealedItems] = useStaggeredAnimation({ delay: 100 });

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    fetchAll('/blogs/')
      .then((data) => {
        if (!isMounted) return;
        const base = getBaseUrl().replace('/api', '');
        const normalized = (Array.isArray(data) ? data : []).map((blog) => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt,
          slug: blog.slug,
          cover_image: blog.cover_image
            ? (blog.cover_image.startsWith('http') ? blog.cover_image : `${base}${blog.cover_image}`)
            : null,
          published_at: blog.published_at,
          author: blog.author,
        }));
        setBlogs(normalized);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch blogs:', error);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="container-px">
      <section id="blog" className="section section-reveal" ref={sectionRef}>
        <div className={isRevealed ? 'revealed' : ''}>
          <h1 className="section-heading text-3xl mb-2">Blog</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 mb-8">
            Articles, insights, and academic writing
          </p>
          {loading ? (
            <div className="text-slate-500 dark:text-slate-400">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="card p-6">
              <p className="text-slate-600 dark:text-slate-300">No blog posts available yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={containerRef}>
              {blogs.map((blog, index) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  className={`card overflow-hidden hover:shadow-lg transition-shadow animate-item ${revealedItems.has(index) ? 'revealed' : ''}`}
                >
                  {blog.cover_image && (
                    <div className="aspect-video bg-slate-100 dark:bg-slate-800">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      {blog.published_at && <span>{formatDate(blog.published_at)}</span>}
                      {blog.author && <span>{blog.author}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

