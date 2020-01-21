
//  const row="<tr class=row100 id=topic"+i+">"+
// "<td class=column100 column1 data-column=column1 id=col0"+i+"></td>"+
// "<td class=column100 column2 data-column=column2 id=col0"+i+">--</td>"+
// "<td class=column100 column3 data-column=column3 id=col1"+i+">--</td>"+
// "<td class=column100 column4 data-column=column4 id=col2"+i+">--</td>"+
// "<td class=column100 column5 data-column=column5 id=col3"+i+">8:00 AM</td>"+
// "<td class=column100 column6 data-column=column6 id=col4"+i+">--</td>"+
// "<td class=column100 column7 data-column=column7 id=col5"+i+">5:00 PM</td>"+
// "<td class=column100 column8 data-column=column8 id=col6"+i+">8:00 AM</td>"+
// "</tr>"

$.ajax({
    headers:{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI3MGMyM2FiNGRiYTJhODA2NTBlYWQiLCJpYXQiOjE1Nzk2MTczMjV9.eaHnVDFoKfCV3oj2G9DFsSLsiJJGjLZvX-szyMr4Q9w'},
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
        //   document.getElementById('topic'+i).innerHTML=data.data[i]
        
        }
        call_next()
    },
    error:function(error){
    console.log(error)
    }
})
function call_next(){
$.ajax({
    headers:{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI3MGMyM2FiNGRiYTJhODA2NTBlYWQiLCJpYXQiOjE1Nzk2MTczMjV9.eaHnVDFoKfCV3oj2G9DFsSLsiJJGjLZvX-szyMr4Q9w'},
    url:'routine',
    type:'GET',
    success:function(data){
      for(i in data.data){
          for(j in data.data[i].topic_cover){
            let day=data.data[i].day
            let top= data.data[i].topic_cover[j]
            if(top==true)
          document.getElementById('col'+day+j).innerHTML='<i class="fa fa-check"></i>'
          else if(top==false)
          document.getElementById('col'+day+j).innerHTML='<i class="fa fa-times"></i>'
        }
            
      }
    },
    error:function(error){

    }
})
}