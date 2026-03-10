import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '@content/posts';
import NeutronStar from './NeutronStar';
import '../styles/BlogPage.css';

const BlogPage = ({ effectsOn }) => {
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const scrollContainer = wrapper.closest('.page-section') || window;

        const handleScroll = () => {
            const offset = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;
            wrapper.style.setProperty('--scroll-offset', `${offset}px`);
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    const posts = getAllPosts();
    let listcontent;
    let filteredPosts = posts.filter(post => new Date(post.date) < new Date());
    if (filteredPosts.length > 0) {
        listcontent = filteredPosts.map((post, i) => {
            return (
                <div
                    key={post.slug}
                    className="blog-post-card"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <span className="post-date">{post.date}</span>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-card-tags">
                        {post.tags.map(tag => (
                            <span key={tag} className="card-tag">{tag}</span>
                        ))}
                    </div>
                </div>
            )
        })
    } else {
        listcontent = <p>maybe i'll put something here someday</p>
    }


    return (
        <div className="blog-wrapper">
            <div className="space-bg">
                <div className={`space-nebula nebula-a ${effectsOn ? '' : 'effects-off'}`}></div>
                <div className={`space-nebula nebula-b ${effectsOn ? '' : 'effects-off'}`}></div>
                <div className={`space-nebula nebula-c ${effectsOn ? '' : 'effects-off'}`}></div>
                <div className="space-grain"></div>
            </div>
            <div className="blog-content-wrapper full-screen-scroll" ref={wrapperRef}>
                <div className="section-content">
                    <h2 className="page-title">Blog</h2>
                    <div className="blog-list" style={{ paddingBottom: 'max(30vh, 320px)', position: 'relative', zIndex: 10 }}>
                        {listcontent}
                    </div>

                    {/* Neutron Star pinned to the bottom of the content */}
                    {effectsOn && (
                        <a
                            href="https://en.wikipedia.org/wiki/Ctenophora"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neutron-star-container"
                        >
                            <NeutronStar />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;