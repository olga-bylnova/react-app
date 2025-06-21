import React, {useContext} from 'react';
import {ThemeContext} from '../contexts/ThemeContext';

const ThemeLayout = ({children}) => {
    const {theme} = useContext(ThemeContext);

    return (
        <div className={`App ${theme === 'dark' ? 'dark' : ''}`}>
            {children}
        </div>
    );
};

export default ThemeLayout;