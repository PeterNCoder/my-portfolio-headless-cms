import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Project = () => {
    const { slug } = useParams();
    const restPath = `http://localhost/wp-portfolio/wp-json/wp/v2/fwd-projects?_embed&slug=${slug.id}`
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
                <article id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}></div>
                </article>
                
            </>
        : 
            <p>Project Content Not Loaded...</p>
        }
        </>
    )

}

export default Project
