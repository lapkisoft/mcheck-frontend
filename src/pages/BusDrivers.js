import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return (
        <div>
            <header>
                <nav>
                    <Link to="/" className="back-link"><i className="fa fa-arrow-left"/> Водители</Link>

                    <img src="/img/nav/icon-person.png" alt=""/>
                </nav>
            </header>
        </div>
    )
}