import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return (
        <section className="section-main-page">
            <nav>
                <ul>
                    <li>
                        <Link to="/dispatcher">
                            <div className="icon">
                                <img src="/img/icon-active-person.png" alt=""/>
                            </div>

                            <div className="text">Диспетчер</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/mechanic">
                            <div className="icon">
                                <img src="/img/icon-active-person.png" alt=""/>
                            </div>

                            <div className="text">Механик</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/medic">
                            <div className="icon">
                                <img src="/img/icon-active-person.png" alt=""/>
                            </div>

                            <div className="text">Медик</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/police">
                            <div className="icon">
                                <img src="/img/icon-active-person.png" alt=""/>
                            </div>

                            <div className="text">Гос авто инспекция</div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    );
}