import { useState, useEffect } from 'react'
import Loading from './Loading'

const Home = () => {
    const restPath = 'http://localhost/wp-portfolio/wp-json/wp/v2/pages/6?_embed'
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
            <section className='home'>
                <div className="entry-text">
                    <h1 className="h1-animate">{restData.title.rendered}</h1>
                    <h2 className="h2-animate" dangerouslySetInnerHTML={{__html:restData.content.rendered.replace('<p>', '').replace('</p>', '')}}>
                    </h2>
                </div>
                <div className="portrait-container">
                    <img
                        className='portrait' 
                        src={`${restData._embedded['wp:featuredmedia'][0]['source_url']}`}
                        width={`${restData._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}`}
                        height={`${restData._embedded['wp:featuredmedia'][0].media_details.sizes.full.height}`}
                        alt={`${restData._embedded['wp:featuredmedia'][0].alt_text}`}
                        srcSet=
                        {`${restData._embedded['wp:featuredmedia'][0]['source_url']} ${restData._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}w,
                        ${restData._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url} ${restData._embedded['wp:featuredmedia'][0].media_details.sizes.medium.width}w`}
                        sizes=
                        {`(max-width: ${restData._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}px) 100vw, ${restData._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}w`}
                    />
                </div>
            <svg className="arrows">
            <path className="a1" d="M0 0 L30 32 L60 0"></path>
            <path className="a2" d="M0 20 L30 52 L60 20"></path>
            <path className="a3" d="M0 40 L30 72 L60 40"></path>
            </svg>
            </section>
        </>
        : 
            <Loading/>
        }
        </>   
    )
  
}

export default Home
