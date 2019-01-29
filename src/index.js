class WesignSignatureSDK{
    constructor(src){
        if(!src) throw new Error("ERROR_NULL_SRC_URL")

        let width = window.screen.availWidth
        let height = window.screen.availHeight
        let targetWindow = window.open(src,
            "_blank",
            `height=${height-100}, width=${width-100}, top=50, left=50, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`)
        
        //EDGE有的时候会返回为null
        this.targetWindow = targetWindow
        this.sendRegistory()
        this.listeners = {
            operationcomplete: []
        }

        window.addEventListener("message", e => {
            if(e.source !== this.targetWindow) return
            
            try{
                if(!e.data.type) return
            } catch(e){
                return
            }

            
            switch(e.data.type){
                case "OPERATION_COMPLETE":{
                    /**
                     * REVOKE          撤销签署
                     * 
                     * SIGN             签署完成
                     * REJECTE         拒绝签署
                     * 
                     * AUDIT_PASS       审核通过
                     * AUDIT_NOTPASS    审核不通过
                     */
                    let event = {
                        type: "operationcomplete",
                        operation: e.data.operation
                    }
                    this.dispatchEvent(event)
                    break
                }
            }
        })
    }

    addEventListener(type, fun){
        if(Array.isArray(this.listeners[type])){
            let index = this.listeners[type].indexOf(fun)
            if(index < 0){
                this.listeners[type].push(fun)
            }
        }
    }

    removeEventListener(type, fun){
        if(Array.isArray(this.listeners[type])){
            let index = this.listeners[type].indexOf(fun)
            this.listeners[type].splice(index, 1)
        }
    }

    dispatchEvent(e){
        let listeners = this.listeners[e.type] || []
        listeners.forEach(function(listener){
            listener(e)
        })
    }

    sendRegistory(){
        let data = {
            type: "REGISTER"
        }
        if(!this.targetWindow) return
        this.targetWindow.postMessage(data, "*")
        setTimeout(_ => {
            this.sendRegistory()
        }, 1000)
    }

    close(){
        if(this.targetWindow) this.targetWindow.close()
    }
}

module.exports = WesignSignatureSDK