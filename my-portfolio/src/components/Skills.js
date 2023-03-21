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

    for(let i = 0; i < restData.length - 1; i++) {
    if(i > restData.length - 1) {
        break;
    }
    if (restData[i]._embedded['wp:term'][0][0].name === restData[i + 1]._embedded['wp:term'][0][0].name) {
        delete restData[i]._embedded['wp:term'][0][0].name
    }
    }
    
    return (
        <>
        { isLoaded ?
            <section id='skills'>
                <h2>Skills</h2>
                {restData.slice(0).reverse().map(post => 
                    <>
                    {post._embedded['wp:term'][0][0].name ? 
                    <h3 className="entry-title" dangerouslySetInnerHTML={{__html:post._embedded['wp:term'][0][0].name}}></h3>
                    : null}
                    <li className="entry-content" dangerouslySetInnerHTML={{__html:post.title.rendered}}></li>
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