import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return (
        <section className="section-main-page">
            <nav>
                <ul>
                    <li>
                        <Link to="/medic/route-sheets">
                            <div className="icon">
                                <img src="/img/icon-active-sheet.png" alt=""/>
                            </div>

                            <div className="text">Путевые листы</div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    );
}