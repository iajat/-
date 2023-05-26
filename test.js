let i =1
console.log(i);

function t() {
    return new Promise((resole, reject) => {
        setTimeout(() => {
            resole(2);
        }, 2000);
    })
}
t().then((res)=>{
     i = res
     console.log(i);
})


 i = 3
console.log(i);