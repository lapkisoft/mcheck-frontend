import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return (
        <div>
            <header>
                <nav>
                    <Link to="/" className="back-link">
                        <i className="fa fa-arrow-left"/> Главная страница
                    </Link>
                </nav>
            </header>

            <div>
                Вернуться на <Link to="/">главную страницу</Link>
            </div>
        </div>
    );
};
