import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPostBySlug, getRelatedPosts } from '@content/posts';
import '../styles/BlogPostPage.css';

const BlogPostPage = ({ effectsOn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Cache the last valid slug so we don't flash "Post not found" during route transition fade-outs
  const lastValidSlug = useRef(location.pathname.replace('/blog/', ''));
  if (location.pathname.startsWith('/blog/')) {
    lastValidSlug.current = location.pathname.replace('/blog/', '');
  }

  const slug = lastValidSlug.current;
  const post = getPostBySlug(slug);
  const postDtCheck = post ? new Date(post.date) <= new Date() : false;

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch markdown content from src/private-content/posts/
  useEffect(() => {
    if (!post || !postDtCheck) return;
    setLoading(true);

    import(`@content/posts/${slug}.md?raw`)
      .then((module) => {
        setContent(module.default);
        setLoading(false);
      })
      .catch(() => {
        setContent('*Post content not found.*');
        setLoading(false);
      });
  }, [slug]);

  // Scroll to top on mount
  useEffect(() => {
    const container = document.querySelector('.page-section.active');
    if (container) container.scrollTop = 0;
  }, [slug]);

  if (!post || !postDtCheck) {
    return (
      <div className="post-page-wrapper">
        <div className="section-content full-screen-scroll">
          <p style={{ color: 'var(--text-muted)', marginTop: '20vh' }}>Post not found.</p>
          <Link to="/blog" className="back-link">← back to notes</Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPosts(post.relatedSlugs || []);

  return (
    <div className="post-page-wrapper">
      <div className="post-bg" style={{ opacity: effectsOn ? 1 : 0, transition: 'opacity 1.2s ease' }}>
        <div className={`post-nebula nebula-1 ${effectsOn ? '' : 'effects-off'}`}></div>
        <div className={`post-nebula nebula-2 ${effectsOn ? '' : 'effects-off'}`}></div>
        <div className="post-grain"></div>
      </div>
      <div className="section-content full-screen-scroll">
        <Link to="/blog" className="back-link">← blog</Link>

        <article className="post-article">
          <header className="post-header">
            <span className="post-meta-date">{post.date}</span>
            <h1 className="post-full-title">{post.title}</h1>
            <div className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="post-tag">{tag}</span>
              ))}
            </div>
          </header>

          <div className="post-body">
            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
            ) : (
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                      />
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {content}
              </Markdown>
            )}
          </div>
        </article>

        {related.length > 0 && (
          <aside className="related-section">
            <h3 className="related-heading">More Reading</h3>
            <div className="related-grid">
              {related.map(r => (
                <div
                  key={r.slug}
                  className="related-card"
                  onClick={() => navigate(`/blog/${r.slug}`)}
                >
                  <span className="related-date">{r.date}</span>
                  <h4 className="related-title">{r.title}</h4>
                  <p className="related-excerpt">{r.excerpt}</p>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
