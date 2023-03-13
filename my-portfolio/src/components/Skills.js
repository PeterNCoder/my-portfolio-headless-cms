import { useState, useEffect } from 'react'

const Skills = () => {
    const restPath = 'http://localhost/wp-portfolio/wp-json/wp/v2/fwd-skills?per_page=100&_embed'
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
            <section id='skills'>
                
                {restData.map(post => 
<>
                <h2 className="entry-content" dangerouslySetInnerHTML={{__html:post._embedded['wp:term'][0][0].name}}></h2>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:post.title.rendered}}></div>
</>
                )}
            </section>
        : 
            <p>Skills Content Not Loaded...</p>
        }
        </>   
    )
  
}

export default Skills
