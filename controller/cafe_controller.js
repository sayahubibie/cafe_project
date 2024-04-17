const fs = require('fs')

const cafe_data = fs.readFileSync("./add_cafe.json","utf-8")
const cafe_data_json = JSON.parse(cafe_data)

//Getting all cafe Data

exports.get_all_items = (req,res)=>{
    console.log("collecting all items ")
    res.status(200).json({message:'success',cafe_data:JSON.stringify(cafe_data_json)})
}


//Getting Cafe Items by ID

exports.get_cafe_item = (req,res)=>{
    //console.log("i am method to show cafe item using id")
    console.log(`path name ${req.url}`)
    //const id = req.params.id * 1
    const id = +req.params.id
    //const cafe = cafe_data_json[id]

    const valid_id = cafe_data_json.find((u) => u.id === id)
    //console.log(valid_id)
    if (!valid_id){
        res.status(404).json({message:`invalid id ${id}`})
    }

    res.status(200).json({message:"success",data:{valid_id},requestAt : req.requestTime})

}

//Adding New Item to add_cafe.json

exports.add_new_item = (req,res)=>{
   
    console.log(`requested time ${JSON.stringify(req.body)}`)

    const new_id = cafe_data_json[cafe_data_json.length -1].id + 1
    //console.log(`new id is ${new_id}`)

    const new_item = Object.assign({id: new_id} ,req.body)
    cafe_data_json.push(new_item)
    //console.log(new_item)

    fs.writeFile("add_cafe.json",JSON.stringify(cafe_data_json),(err)=>{
       res.status(200).json({message:"success", data: {cafe_data_json} })
        console.log("Added successfully")
    })
}

//patch method used to update particular field in json array by id 

exports.update_item = (req,res)=>{
    const id = req.params.id * 1
    const cafe_update = cafe_data_json.find((m) => m.id === id)
    console.log(JSON.stringify(cafe_update))

    if(! cafe_update){
        res.status(404).json({status : "fail", message:"no cafe object with this id " + id})
    }
    const index = cafe_data_json.indexOf(cafe_update)
    Object.assign(cafe_update,req.body)
    cafe_data_json[index]=cafe_update

    fs.writeFile("./add_cafe.json",JSON.stringify(cafe_data_json),(err)=>{
        res.status(200).json({status : "success",data : {cafe_update}})
    })
   
}

//Delete the json array dy ID

exports.detele_items = (req,res)=>{
    const id = req.params.id
    const cafe_delete = cafe_data_json.find((s) => s.id === id)

    if(!cafe_delete){
        res.status(404).json({status : "failed", message : `id ${id} is not exist in the json file`})
    }
    
    const index = cafe_data_json.indexOf(cafe_delete)
    cafe_data_json.splice(index, 1)

    fs.writeFile("./add_cafe.json", JSON.stringify(cafe_data_json),(err)=>{
        res.status(200).json({status : "success"})
    })

}