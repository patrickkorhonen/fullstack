const Notification = ({message, errMessage}) => {
    if (message === '' && errMessage === '') {
        return null
    } else if (errMessage === '') {
        return (
            <div className="person">
                {message}
            </div>
        )
    } else {
        return (
            <div className="error">
                {errMessage}
            </div>
        )
    }
    
}

export default Notification