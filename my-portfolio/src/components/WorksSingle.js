import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const WorksSingle = ( {featuredImage} ) => {
    const slug = useParams()
    const restPath = `http://localhost/wp-portfolio/wp-json/wp/v2/fwd-projects?_embed=&slug=${slug.id}`
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
                <p>HELLO WORLD!</p>
            </>
        : 
            <Loading />
        }
        </>
    )

}

export default WorksSingle
