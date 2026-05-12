export function Notification({ message }) {
    if (message === null) {
        return null
    }
    return (
        <div className={message.type === 'success' ? "successMsg" : "errorMsg"}>
            {message.msg}
        </div>
    )
}

