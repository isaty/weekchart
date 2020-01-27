var i=0
$(document).on('click','#add',function(e){
    var form=document.getElementById(i)
    i++
    var elem=document.createElement('input')
    elem.setAttribute('id',i)
    elem.setAttribute('type','text')
    elem.setAttribute('class','topic')
    form.after(elem)
})
$document.on('click','#btn',function(e){
    let topic=[]
    for(j=0;j<=i;j++){
     topic[j]=document.getElementsById(j)
    }
    $.ajax({
        headers:{'token':''},
        url:'topics',
        type:'POST',
        data:{topic},
        success:function(){
          windows.location.href="127.0.0.1/index"
        },
        error:function(e){
        alert(e)
        }

    })
})