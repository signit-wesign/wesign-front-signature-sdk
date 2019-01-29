import WesignSignatureSDK from "../src/index.js"

let wsign = null

document.getElementById("open").addEventListener("click", e => {
    let src = document.getElementById("src").value
    wsign = new WesignSignatureSDK(src)
    wsign.addEventListener("operationcomplete", listenOperationComplete)
})

document.getElementById("close").addEventListener("click", e => {
    if(!wsign) return
    wsign.close()
    wsign = null
})


function listenOperationComplete(event){
    console.log(event)
    alert(`operationcomplete:${event.operation}`)
    wsign.close()
    wsign = null
}