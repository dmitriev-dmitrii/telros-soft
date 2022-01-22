// console.log(process.env.NODE_ENV=="development");

function url() { 
return	process.env.NODE_ENV=="development" ?  'http://localhost:9090' : 'https://telros-soft-backend.herokuapp.com'
}

export default url();