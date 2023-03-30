import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const WorksCards = () => {
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
                <div className="cards-container">
                    {restData.map(post => 
                        <article className="works-cards" key={post.id} id={`works-${post.id}`}>
                            <Link to={`/${post.slug}`}>
                                <figure>
                                    <img className="card-img"
                                        src={`${post._embedded['wp:featuredmedia'][0].media_details.sizes.works_card.source_url}`}
                                        width={`${post._embedded['wp:featuredmedia'][0].media_details.sizes.works_card.width}`}
                                        height={`${post._embedded['wp:featuredmedia'][0].media_details.sizes.works_card.height}`}
                                        alt={`${post._embedded['wp:featuredmedia'][0].alt_text}`}
                                        srcSet=
                                        {`${post._embedded['wp:featuredmedia'][0].media_details.sizes.works_card.source_url} ${post._embedded['wp:featuredmedia'][0].media_details.sizes.works_card.width}w,
                                        ${post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url} ${post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.width}w`}
                                        sizes=
                                        {`(max-width: ${post._embedded['wp:featuredmedia'][0].media_details.sizes.works_card.width}px) 100vw, ${post._embedded['wp:featuredmedia'][0].media_details.sizes.works_card.width}w`}
                                    />

                                    <figcaption dangerouslySetInnerHTML={{__html:post.title.rendered}}>
                                    </figcaption>
                                </figure>
                            </Link>
                        </article>
                    )}
                </div>

            </section>
        : 
            <Loading/>
        }
        </>
    )
}

export default WorksCards
