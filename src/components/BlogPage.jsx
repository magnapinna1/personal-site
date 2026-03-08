import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '@content/posts';
import NeutronStar from './NeutronStar';
import '../styles/BlogPage.css';

const BlogPage = () => {
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const handleScroll = () => {
            // Maps scroll position to a custom property for CSS rendering
            wrapper.style.setProperty('--scroll-offset', `${wrapper.scrollTop}px`);
        };

        wrapper.addEventListener('scroll', handleScroll, { passive: true });
        // Initialize immediately
        handleScroll();

        return () => wrapper.removeEventListener('scroll', handleScroll);
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
                <div className="space-stars deep-stars"></div>
                <div className="space-stars mid-stars"></div>
                <div className="space-nebula nebula-a"></div>
                <div className="space-nebula nebula-b"></div>
                <div className="space-grain"></div>
            </div>
            <div className="blog-content-wrapper full-screen-scroll" ref={wrapperRef}>
                <div className="section-content">
                    <h2 className="page-title">Notes</h2>
                    <div className="blog-list" style={{ paddingBottom: '30vh', position: 'relative', zIndex: 10 }}>
                        {listcontent}
                    </div>

                    {/* Neutron Star pinned to the bottom of the content */}
                    <div
                        className="neutron-star-container"
                        style={{ position: 'absolute', bottom: 0, left: '-10vh', width: '100%', height: '40vh', rotate: '-45deg', overflow: 'hidden', cursor: 'pointer', zIndex: 0 }}
                        onClick={() => window.open("https://en.wikipedia.org/wiki/Ctenophora", "_blank", "noopener")}
                    >
                        <NeutronStar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;