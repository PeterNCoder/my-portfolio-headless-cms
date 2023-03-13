import { useState, useEffect } from 'react'

const Home = () => {
    const restPath = 'http://localhost/wp-portfolio/wp-json/wp/v2/pages/6'
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
            <section id='home'>
                <h1>{restData.title.rendered}</h1>
                <h2 dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </h2>
            </section>
        : 
            <p>Hero Content Not Loaded...</p>
        }
        </>   
    )
  
}

export default Home
