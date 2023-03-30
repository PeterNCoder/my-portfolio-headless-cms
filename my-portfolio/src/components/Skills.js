import { useState, useEffect } from 'react'
import Loading from './Loading'

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

    const restData2 = restData;
    console.log(restData2);

    // for(let i = 0; i < restData.length - 1; i++) {
    // if(i > restData.length - 1) {
    //     break;
    // }
    // if (restData[i]._embedded['wp:term'][0][0].name === restData[i + 1]._embedded['wp:term'][0][0].name) {
    //     delete restData[i]._embedded['wp:term'][0][0].name
    // }
    // }
    
    return (
        <>
        { isLoaded ?
            <section id='skills'>
                <h2>Skills</h2>
                <div className="skills-content">
                    {restData.slice(0).reverse().map(post => 
                        <div key={post.id}>
                            {post._embedded['wp:term'][0][0].name ? 
                            <h3 className="skills-title" dangerouslySetInnerHTML={{__html:post._embedded['wp:term'][0][0].name}}></h3>
                            : null}
                            
                            <p className="skills-item" dangerouslySetInnerHTML={{__html:post.title.rendered}}></p>
                        </div>
                    )}
                </div>



                {restData2.map(post => 
                        <div key={post.id}>
                            <span>
                            <h3 className="skills-title" dangerouslySetInnerHTML={{__html:post.title.rendered}}></h3>
                            
                            <div className="skills-item" dangerouslySetInnerHTML={{__html:post.content.rendered}}></div>
                            </span>
                        </div>
                    )}




            </section>
        : 
            <Loading/>
        }
        </>   
    )
  
}

export default Skills