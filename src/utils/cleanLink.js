function cleanLink(link){
    
    // http://localhost:8080/api/desks/157{projection} 
    // clean the link from its projections 

    let leftParanPos;
    for(let i = 0 ; i < link.length; i++){
    if(link[i] === '{'){
        leftParanPos = i;
            break;
        }
    }
    console.log(link);
    
    return link.substr(0, leftParanPos);
}

export default cleanLink;
