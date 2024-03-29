// import requirements
const localeList = require('./json_data_locale.min.js')

const express   = require('express')        // for routers
const app       = express()                 // instantiation of express object
const https     = require('https')          // for secure servers
const cors      = require('cors')           // use for same domain requests
const fs        = require('fs')             // for reading the SSL certificates

app.use(cors({
    origin: '*'
}))

require('dotenv').config()

function logRouteParams(r, p) {
    console.log()
    console.log(`API Call on ${r}`)
    console.log(`Call arguments: ${JSON.stringify(p.params)}`)
}

function send500Error(err) {
    return {
        status: 500,
        errorMessage: err
    }
}

// RESET THIS CODE WHEN DEPLOYING TO PRODUCTION ENVIRONMENTS
// RESTRICT THE CORS TO SAME ORIGIN.

app.get('/', (req,res) => {
  logRouteParams('/', req.params)
  res.status(403).send('you are not allowed to access this location')
  res.end()
})

// fix the favicon request that results into a 404, halting the API
app.get('/favicon.ico', (req, res) => {
    res.status(204)
    res.end()
})

// get all regions:
app.get('/api/locale/regions', (req, res) => {
    logRouteParams('/api/locale/regions', req)
    res.status(200).send(localeList.regionsObj);
    res.end()
})

// get all provinces that belong to a specific region
app.get('/api/locale/provinces/:parentId', (req, res) => {
    logRouteParams('/api/locale/prov/:parentId', req)
    try {
        const provinces = localeList.provincesObj.filter((item) => {
            return item.p === req.params.parentId
        })
        if(provinces.length > 0) 
            res.status(200).send(provinces)
        else
            res.status(404).send({
                status: 404,
                errorMessage: "Province list not found for region code " + req.params.parentId
            })
    } catch (err) {
        res.status(500).send(send500Error(err))
    } finally {
        res.end()
    }
})

// get all cities that belong to a specific province
app.get('/api/locale/cities/:parentId', (req, res) => {
    logRouteParams('/api/locale/cities/:parentId', req)
    try {
        const cities = localeList.citiesObj.filter((item) => {
            return item.p === req.params.parentId
        })
        if(cities.length > 0)
            res.status(200).send(cities)
        else {
            res.status(404).send({
                status: 404,
                errorMessage: "Cities list not found for province code " + req.params.parentId
            })
        }
    } catch (err) {
        res.status(500).send(send500Error(err))
    } finally {
        res.end()
    }
})

app.get('/api/locale/barangays/:parentId', (req, res) => {
    logRouteParams('/api/locale/brgys/:parentId', req)
    try {
        const brgys = localeList.barangaysObj.filter((item) => {
            return item.p === req.params.parentId
        })
        if(brgys.length > 0) 
            res.status(200).send(brgys)
        else {
            res.status(404).send({
                status: 404,
                errorMessage: "Barangays list not found for city code " + req.params.parentId
            })
        }
    } catch (err) {
        res.status(500).send(send500Error(err))
    } finally {
        res.end()
    }
})


// =================================================================================
// start listening

const defPort = parseInt(process.env.DEF_PORT);

if (process.env.SERVER_MODE === 'HTTP') {
    /* start the server in HTTP */

    app.listen(process.env.DEF_PORT, () => {
        console.log(`SYSTEM: NodeJS server now running at port ${process.env.DEF_PORT}.`)
    })

} else if (process.env.SERVER_MODE === 'HTTPS') {
    /* use HTTPS connection */
    const sslOptions = {
        key : fs.readFileSync(process.env.SSL_LOC_KEYP),
        cert : fs.readFileSync(process.env.SSL_LOC_CERT)
      }
      
      var httpsServer = https.createServer(sslOptions, app).listen(parseInt(process.env.DEF_PORT), () => {
        console.log(`SYSTEM: NodeJS (http/s) server now running at port ${process.env.DEF_PORT}.`)
      })
} else {
    console.error (`Cannot run the API, unknown SERVER_MODE value is read, must be 'HTTP' or 'HTTPS', but ${process.env.SERVER_MODE} is read.`);
}



