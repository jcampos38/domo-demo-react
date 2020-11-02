import React, { useContext, useState, useEffect } from 'react';
import UserContext from './../../context/UserContext';
import { Col } from 'reactstrap';
import EmbedService from '../../services/EmbedService';

const Dashboards = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    const [ids, setIds] = useState([]);
    const [embedTokens, setEmbedTokens] = useState([]);

    const getIds = async () => {
        try {
            const { data } = await EmbedService.getItems();
            console.log(data)
            setIds(data);
        }catch(e) {
            console.log(e);
        }
    }

    const getEmbedToken = async (id, title) => {
        try {
            const { data } = await EmbedService.getEmbedToken(id);
            data.id = id;
            data.title = title;
            console.log(data)
            return data;
        }catch(e) {
            console.log(e);
            return null;
        }
    }

    const getEmbedTokens =  () => {
        let tokens = Promise.all(ids.map((i) => (
            getEmbedToken(i.idVisualization, i.title)
        )));
        tokens.then(data => setEmbedTokens(data))
    }

    useEffect(()=>{
        getIds();
    },[])

    useEffect(() => {
        if(ids.length > 0) {
            getEmbedTokens()
        }// eslint-disable-next-line
    },[ids])

    const getGeneratedPageURL = (embedToken, embedUrl) => { 
        const source = '' +
            "<html>\n" +
            "   <body>\n" + 
            "        <form id=\"form\" action=\"" + embedUrl + "\" method=\"post\">\n" + 
            "        <input type=\"hidden\" name=\"embedToken\" value=\"" + embedToken + "\">\n" + 
            "        </form>\n" + 
            "        <script>\n" + 
            "        document.getElementById(\"form\").submit();\n" + 
            "        </script>\n" +
            "    </body>\n" +
            "</html>\n";
    
        return source;
    }

    return(
        <div className="dashboards">
            <h2>Welcome {user.account.name}, your cards:</h2>
            {embedTokens.map(v => (
                <Col id={"if-container"+v.id} className="domo-card" md={{ size: 8, offset: 2 }}>
                    <h4>{v.title}</h4> 
                    <iframe id={"iframe"+v.id} title={v.id} srcDoc={getGeneratedPageURL(v.embedToken, v.embedUrl)} width="100%" height="100%" scrolling="no"/>
                </Col>
            ))}
        </div>
    );
}

export default Dashboards;
