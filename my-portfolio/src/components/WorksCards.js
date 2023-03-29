import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const WorksCards = ( {featuredImage} ) => {
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
            <section id="works">
                <h2>Works</h2>
                {restData.map(post => 

                    <div className="card-container">
                        <Link to={`/${post.slug}`}>
                            <article className="works-cards" key={post.id} id={`works-${post.id}`}>
                                {post.featured_media !== 0 && post._embedded['wp:featuredmedia'][0] &&
                                    <figure className="works-img-container" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}>
                                    </figure>
                                }
                                <figcaption dangerouslySetInnerHTML={{__html:post.title.rendered}}>
                                </figcaption>
                            </article>
                        </Link>
                    </div>
                )}

            </section>
        : 
            <Loading/>
        }
        </>
    )
}

export default WorksCards
