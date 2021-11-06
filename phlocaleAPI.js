// import requirements
const localeList = require('./json_data_locale.min.js')

const express   = require('express')        // for routers
const app       = express()                 // instantiation of express object
const https     = require('https')          // for secure servers
const cors      = require('cors')           // use for same domain requests

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

// get all regions:
app.get('/api/locale/regions', (req, res) => {
    logRouteParams('/api/locale/regions', req)
    res.status(200).send(localeList.regionsObj);
    res.end()
})

// get all provinces that belong to a specific region
app.get('/api/locale/provs/:parentId', (req, res) => {
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

app.get('/api/locale/brgys/:parentId', (req, res) => {
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

app.listen(process.env.DEF_PORT, () => {
    console.log(`SYSTEM: NodeJS server now running at port ${process.env.DEF_PORT}.`)
})
