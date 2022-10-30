const ShortUrl = require('../models/shortUrl')

const getUrls = async (req,res) =>{
    try{
        const shortUrls = await ShortUrl.find()    
        res.send( { data: shortUrls, succesCode : 200  });
    }

    catch(err){
        res.send({statusCode:500,message:"internal  server error"})
    }

 
}

const postUrl = async (req,res) =>{
    try {
       const exist = await ShortUrl.findOne({full:req.body.full})
    if(exist) return res.send({succesCode : 200,message:"Already this url used" })
    else{
    const postsUrl =  await ShortUrl.create(req.body)
    res.send({data:postsUrl,succesCode : 200,message:"Success" })
    } 
    } catch (error) {
        res.send({succesCode : 500,message:"Internal Server error" })
    }
    
}

const getShortUrl = async (req,res)=>{
    try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.send({statusCode:404,message:"Invalid Url"})
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)   
    } catch (error) {
        res.send({statusCode:500,message:"internal  server error"})
    }

}

module.exports={getUrls, postUrl, getShortUrl}
