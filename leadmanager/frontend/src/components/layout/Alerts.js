import React, { Component, Fragment } from 'react'
import { withAlert } from "react-alert"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import errors from '../../reducers/errors'


export class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object
    }

    componentDidUpdate(prevProps){
        const {error, alert, message} = this.props;
        if (error !== prevProps.error){
            if(error.msg.name){
                alert.show(`Name: ${error.msg.name.join()}`)
            }
            if(error.msg.email){
                alert.show(`Email: ${error.msg.email.join()}`)
            }
            if(error.msg.message){
                alert.show(`Message: ${error.msg.message.join()}`)
            }
            if(error.msg.non_field_errors){
                alert.error(error.msg.non_field_errors.join())
            }
            if(error.msg.username){
                alert.show(`Username: ${error.msg.username.join()}`)
            }

        }

        if(message !== prevProps.message){
            if(message.deleteLead){ alert.success(message.deleteLead)}
            if(message.addLead){ alert.success(message.addLead)}
            if(message.passwordNotMatch){ alert.error(message.passwordNotMatch)}


        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)( withAlert()(Alerts))
