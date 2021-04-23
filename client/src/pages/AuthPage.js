
export const AuthPage = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Auth</h1>
                <div className="input-field col s12">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="blue-input" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="blue-input" />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="card-action">
                    <button className="btn yellow darken-4">Sign In </button>
                    <button className="btn ">Sign ON</button>
                </div>
            </div>
        </div>
    )
}