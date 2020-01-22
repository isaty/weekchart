var p;
function match(data,i){
for(j=0;j<data.length;j++){
    if(data[j].day==i){
   console.log(true)
        return j+1
 }
}
return false
}
$.ajax({
    headers:{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI3ZTQxN2UwZTQ0ODBmOTgxNWNhNTAiLCJpYXQiOjE1Nzk2NzI2NDF9.kvlEVOhfxNOGBv69NxrIlkDhcFI4jZiB_qAs4tj6CMA'},
    url:'topics',
    type:'GET',
    success:function(data){
      for(i in data.data){
          document.querySelector('tbody').innerHTML+="<tr class=row100 id=topic"+i+">"+
          "<td class=column100 column1 data-column=column1 id=col"+i+">"+data.data[i]+"</td>"+
          "<td class=column100 column2 data-column=column2 id=col0"+i+"></td>"+
          "<td class=column100 column3 data-column=column3 id=col1"+i+"></td>"+
          "<td class=column100 column4 data-column=column4 id=col2"+i+"></td>"+
          "<td class=column100 column5 data-column=column5 id=col3"+i+"></td>"+
          "<td class=column100 column6 data-column=column6 id=col4"+i+"></td>"+
          "<td class=column100 column7 data-column=column7 id=col5"+i+"></td>"+
          "<td class=column100 column8 data-column=column8 id=col6"+i+"></td>"+
          "</tr>"
        }
        p=i
        call_next()
    },
    error:function(error){
    console.log(error)
    }
  })
  function call_next(){
  $.ajax({
    headers:{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI3ZTQxN2UwZTQ0ODBmOTgxNWNhNTAiLCJpYXQiOjE1Nzk2NzI2NDF9.kvlEVOhfxNOGBv69NxrIlkDhcFI4jZiB_qAs4tj6CMA'},
    url:'routine',
    type:'GET',
    success:function(data){
        const len=data.data.length
      for(i=0;i<=new Date().getDay();i++){
        let index=match(data.data,i)  
        console.log(index)
        if(index){
            console.log(index)
          for(j=0;j<=p;j++){
            let day=data.data[index-1].day
            let top= data.data[index-1].topic_cover[j]
            if(top==true)
          document.getElementById('col'+day+j).innerHTML='<i class="fa fa-check"></i>'
          else if(top==false)
          document.getElementById('col'+day+j).innerHTML='<i class="fa fa-times"></i>'
        }
    }
    else{
        for(j=0;j<=p;j++){
            document.getElementById('col'+i+j).innerHTML='<i class="fa fa-times"></i>'
        }
    }
      }
    },
    error:function(error){
  
    }
  })
  }