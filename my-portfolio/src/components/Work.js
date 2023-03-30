import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Work = () => {
    const slug = useParams()
    const restPath = `http://localhost/wp-portfolio/wp-json/wp/v2/fwd-projects?_embed=&slug=${slug.id}&acf_format=standard`
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


    console.log(restData[0]);
    return (
        <>
        { isLoaded ?
            <>
                    <h1 className="work-title" dangerouslySetInnerHTML={{__html:restData[0].title.rendered}}>
                    </h1>

                    <ul className="work-skill-list">
                        {restData[0].acf.work_tech.map(post => 
                                <li key={post} className="work-skill-item">{post}</li>
                        )}
                    </ul>

                    <div className="work-flex">
                        <img className="work-img"
                            src={`${restData[0]._embedded['wp:featuredmedia'][0]['source_url']}`}
                            width={`${restData[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}`}
                            height={`${restData[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full.height}`}
                            alt={`${restData[0]._embedded['wp:featuredmedia'][0].alt_text}`}
                            srcSet=
                            {`${restData[0]._embedded['wp:featuredmedia'][0]['source_url']} ${restData[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}w,
                            ${restData[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url} ${restData[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.width}w`}
                            sizes=
                            {`(max-width: ${restData[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}px) 100vw, ${restData[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}w`}
                        />

                        <a className="faux-btn" href="https://www.google.ca/" target="_blank" rel="noopener noreferrer" aria-label={`${restData[0].title.rendered} Website`}>Visit Website</a>
                    </div>

                        <h2 className="work-overview-title">Overview</h2>
                        <p className="work-overview" dangerouslySetInnerHTML={{__html:restData[0].acf.work_overview}}>
                        </p>

                        <h2 className="feautured-title">Featured</h2>

                        <img className="overview-img"
                            src={`${restData[0].acf.capture_img.url}`}
                            width={`${restData[0].acf.capture_img.width}`}
                            height={`${restData[0].acf.capture_img.height}`}
                            alt={restData[0].acf.capture_img.alt}
                            srcSet=
                            {`${restData[0].acf.capture_img.url} ${restData[0].acf.capture_img.width}w,
                            ${restData[0].acf.capture_img.sizes.works_card} ${restData[0].acf.capture_img.sizes['works_card-width']}w`}
                            sizes=
                            {`(max-width: ${restData[0].acf.capture_img.width}px) 100vw, ${restData[0].acf.capture_img.width}w`}
                        />

            </>
        : 
            <Loading />
        }
        </>
    )

}

export default Work
