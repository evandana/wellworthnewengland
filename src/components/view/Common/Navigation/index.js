import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import { ANONYMOUS } from '../../../../constants';
import './styles.css';

const buildIconMenu = (role, actions) => {

    const { openModal } = actions;
    
    console.log('role is', role);
    
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

const buildLinks = (role) => {
    const links = [];
    if (role === ANONYMOUS) {
        links.push(<FlatButton label="Login" />);
    }
    return links;
};

const Navigation = (props) => {
    
    const { user, userRole, logoutUser, openModal } = props;
    
    const userMsg = user ? `Logged in as ${user.email}` : 'User is not logged in';
    const titleLink = (<Link className="navigation__title-link" to="/">Well&#8226;Worth</Link>);
    const iconMenu = buildIconMenu(userRole, { openModal });
    
    return (
        <div>
                    {/*<li><Link to="/authorized">Authorized</Link></li>*/}
                    {/*<li><Link to="/login">Login</Link></li>*/}
                    {/*<li><span className="navigation__logout_link" onClick={logoutUser}>Logout</span></li>*/}

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