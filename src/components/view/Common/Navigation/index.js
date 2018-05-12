import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import { ANONYMOUS } from '../../../../constants';
import './styles.css';

const buildIconMenu = (role, actions) => {
    const { openModal } = actions;
    if (role === ANONYMOUS) {
        return <FlatButton onTouchTap={openModal} label="Login" />;
    } else {
        return (<IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem primaryText="Logout" />
            </IconMenu>
        );
    }
};


const Navigation = (props) => {
    const { userRole, openModal } = props;
    const titleLink = (<Link className="navigation__title-link" to="/">Well&#8226;Worth</Link>);
    const iconMenu = buildIconMenu(userRole, { openModal });
    return (
        <div>
            <AppBar
                title={titleLink}
                showMenuIconButton={false}
                iconElementRight={iconMenu}
            >
            </AppBar>
        </div>
    );
};

export default Navigation;