import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Modal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        const { open, title, ModalComponent } = this.props;
        
        const actions = [
        ];

        return (
            <div>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={true}
                    open={open}
                >
                    {ModalComponent && <ModalComponent />}
                </Dialog>
            </div>
        );
    }
} 