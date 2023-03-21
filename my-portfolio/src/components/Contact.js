import { useState, useEffect } from 'react'

const Contact = () => {
    const restPath = 'http://localhost/wp-portfolio/wp-json/wp/v2/pages/52'
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
            <section id='contact'>
                <h2>{restData.title.rendered}</h2>
                <div dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>
            </section>
        : 
            <p>Contact Content Not Loaded...</p>
        }
        </>   
    )
  
}

export default Contact
