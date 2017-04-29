export const asyncMap = async function(inArray,inCallback){
  let result = [];
  for(let [index,item] of inArray.entries()){
    result.push ( await inCallback(item,index) );
  }
  return result;
}
