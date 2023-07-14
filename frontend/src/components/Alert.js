import React, { useState } from 'react'
import './Alert.css'

export default function Alert(props) {
    return (
        props.alert && <div className={`alert alert-${props.alert.type} alert-fixed fade show`} role="alert">
            <strong>{(props.alert.type == 'danger')? "Error! ": "Success! "}</strong>{props.alert.msg}
        </div>
    )
}
