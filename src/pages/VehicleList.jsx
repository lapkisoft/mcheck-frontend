import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return (
        <div>
            <header>
                <nav>
                    <Link to="/" className="back-link"><i className="fa fa-arrow-left"/> Транспортные средства</Link>

                    <img src="/img/nav/icon-vehicle.png" alt=""/>
                </nav>
            </header>
        </div>
    )
}