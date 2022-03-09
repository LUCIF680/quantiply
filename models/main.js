module.exports.download = function (link){
    const file = fs.createWriteStream("file.jpg");
    axios.get('https://apod.nasa.gov/apod/image/2203/FlowerRock_Curiosity_960.jpg',{responseType: 'stream'})
    .then(response => {
        response.data.pipe(file);
        return true;
    }).catch(err =>{
        return false;
    })
}