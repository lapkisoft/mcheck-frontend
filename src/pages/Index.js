import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return (
        <section className="section-main-page">
            <nav>
                <ul>
                    <li>
                        <Link to="/route-sheets">
                            <div className="icon">
                                <img src="/img/icon-active-sheet.png" alt=""/>
                            </div>

                            <div className="text">Путевые листы</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/vehicles">
                            <div className="icon">
                                <img src="/img/icon-active-vehicle.png" alt=""/>
                            </div>

                            <div className="text">Транспортные средства</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/bus-drivers">
                            <div className="icon">
                                <img src="/img/icon-active-person.png" alt=""/>
                            </div>

                            <div className="text">Водители</div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    );
}