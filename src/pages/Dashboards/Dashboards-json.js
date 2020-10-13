import React, { useContext } from 'react';
import UserContext from './../../context/UserContext';
import { Col } from 'reactstrap';

const baseUrl = process.env.REACT_APP_API_URL;
const Dashboards = () => {
    const { user } = useContext(UserContext);
    return(
        <div className="dashboards">
            <h2>Welcome {user.username}, your cards:</h2>
            {user.visualizations.map(v => (
                <Col className="domo-card" md={{ size: 8, offset: 2 }}>
                    <h4>{v.title}</h4> 
                    <iframe id={"iframe"+v.id} title={v.id} src={baseUrl+"/embed/items/"+v.id} width="100%" height="100%" scrolling="no">
                    <html>
                        <body>\n" + 
                            <form id="form" action={embedUrl} method="post">
                                <input type="hidden" name="embedToken" value={embedToken}/>
                            </form>
                        </body>
                    </html>
                    </iframe>
                </Col>
            ))}
        </div>
    );
}

export default Dashboards;
