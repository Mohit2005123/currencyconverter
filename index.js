
let apikey="c20ac7a65a154a2b3595272d";
let url="https://v6.exchangerate-api.com/v6/";
let countrycodes= document.querySelectorAll('select');
console.dir(countrycodes);
let array=[]
async function getcodes(){
    const resp= await axios.get(url+apikey+'/codes');
    const data=  await resp.data;
   array= data.supported_codes;
   for(let j=0; j<countrycodes.length; j++){
    let country= countrycodes[j];
    for(let i=0; i<array.length; i++){
        let newoption= document.createElement('option');
        newoption.value= array[i][0];
        newoption.innerText= array[i][0];
        country.appendChild(newoption);
    }
   }
}
getcodes();
let button = document.querySelector('button');
let form= document.querySelectorAll('form');
for(let i=0; i<form.length; i++){
    let sub= form[i];
    sub.addEventListener('submit',(event)=>{
        event.preventDefault();
    } );
}
let input= document.querySelectorAll('input');
button.addEventListener('click', async (accept, reject)=>{
    try{
        let country1= countrycodes[0].value;
    let country2= countrycodes[1].value;
    let resp= await axios.get(`${url}/${apikey}/pair/${country1}/${country2}`);
    let data= await resp.data;
    let conrate= await data.conversion_rate;
    let value= input[0].value;
    if(value.length!=0){
        let ans= value*conrate;
    console.log(ans);
    input[1].value= ans;
    }
    
    }
    catch{
        console.log('error');
    }
});
document.addEventListener('keydown', async (event)=>{
    try{
        if(event.key=='Enter'){
            let country1= countrycodes[0].value;
    let country2= countrycodes[1].value;
    let resp= await axios.get(`${url}/${apikey}/pair/${country1}/${country2}`);
    let data= await resp.data;
    let conrate= await data.conversion_rate;
    let value= input[0].value;
    if(value.length!=0){
        let ans= value*conrate;
        console.log(ans);
        input[1].value= ans;
    }
  
        }
        
    }
    catch{
        console.log('error');
    }
});