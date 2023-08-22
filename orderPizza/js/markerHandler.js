AFRAME.registerComponent("marker-handler", {
    init:async function() {
        this.el.addEventListener("markerFound",()=>{
            console.log("marker found!")
            this.handleMarkerFound()
        })
        this.el.addEventListener("markerLost",()=>{
            console.log("marker lost!")
            this.handleMarkerLost()
            
        })
    },
    handleMarkerFound:function(){
        var buttonDiv = document.getElementById('button-div')
        buttonDiv.style.display = "flex"
        var ratingButton = document.getElementById('rating-button')
        var orderButton = document.getElementById('order-button')
        ratingButton.addEventListener('click',function(){
            swal({
                icon:"warning",
                title:"Rate Dish",
                text:"work in progress"
            })
        })
        orderButton.addEventListener('click',function(){
            swal({
                icon:"https://c.tenor.com/0AVbKGY_MxMAAAAC/check-mark-verified.gif",
                title:"Thanks for Order",
                text:"Your order will be served soon at your table"
            })
        })
    },
    handleMarkerLost:function(){
        var buttonDiv = document.getElementById('button-div')
        buttonDiv.style.display = "none"
    },
})
