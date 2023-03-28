import { useState, useEffect } from 'react'

const ProjectCards = ( {featuredImage} ) => {
    const restPath = 'http://localhost/wp-portfolio/wp-json/wp/v2/fwd-projects?_embed'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    return (
        <>
        { isLoaded ?
            <>
                <h2>Projects</h2>
                {restData.map(post => 
                    <article key={post.id} id={`project-${post.id}`}>
                        <article>
                            {post.featured_media !== 0 && post._embedded['wp:featuredmedia'][0] &&
                                <figure className="project-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}>
                                </figure>
                            }
                            <figcaption dangerouslySetInnerHTML={{__html:post.title.rendered}}>
                            </figcaption>
                            
                        </article>
                    </article>
                )}

            </>
        : 
        <p>Projects Content Not Loaded...</p>
        }
        </>
    )
}

export default ProjectCards
