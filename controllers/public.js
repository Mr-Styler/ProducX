exports.getHome = (req, res, next) => { 
    res.status(200).render("index", { PageTitle: "Home", Path: "/"})
}

exports.getAbout = (req, res, next) => { 
    res.status(200).render("about", { PageTitle: "Home", Path: "/"})
}

exports.getContact = (req, res, next) => { 
    res.status(200).render("contact", { PageTitle: "Home", Path: "/"})
}

exports.getServices = (req, res, next) => { 
    res.status(200).render("services", { PageTitle: "Home", Path: "/"})
}
