const Notfound=({ location })=>{


return(
<div id="wrapper">
    <div id="content-wrapper" className="d-flex flex-column">


        <div id="content">
            <div className="container-fluid">

                <div className="text-center">
                    <div className="error mx-auto" data-text="404">404</div>
                    <p className="lead text-gray-800 mb-5">Page Not Found {location.pathname}</p>
                    <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                    <a href="/login">&larr; Back to Dashboard</a>
                </div>
            </div>
        </div>
    </div>
</div>

)


}

export default Notfound;