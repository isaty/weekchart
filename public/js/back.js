var p
var week
$.ajax({
  headers: { 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI3MGMyM2FiNGRiYTJhODA2NTBlYWQiLCJpYXQiOjE1Nzk2MTczMjV9.eaHnVDFoKfCV3oj2G9DFsSLsiJJGjLZvX-szyMr4Q9w' },
  url: 'topics',
  type: 'GET',
  success: function (data) {
    for (i in data.data) {
            document.querySelector('tbody').innerHTML += "<tr class=row10 id=" + i + ">" +
        "<td class=column100 column1 data-column=column1 id=col" + i + ">" + data.data[i] + "</td>" +
        "<td class=column100 column2 data-column=column2 id=col0" + i + "></td>" +
        "<td class=column100 column3 data-column=column3 id=col1" + i + "></td>" +
        "<td class=column100 column4 data-column=column4 id=col2" + i + "></td>" +
        "<td class=column100 column5 data-column=column5 id=col3" + i + "></td>" +
        "<td class=column100 column6 data-column=column6 id=col4" + i + "></td>" +
        "<td class=column100 column7 data-column=column7 id=col5" + i + "></td>" +
        "<td class=column100 column8 data-column=column8 id=col6" + i + "></td>" +
        "</tr>"
    }
    p = i
    week=data.week
    call_next(0)
  },
  error: function (error) {
    console.log(error)
  }
})
function match(data, i) {
  for (j = 0; j < data.length; j++) {
    if (data[j].day == i) 
      return j + 1
  
  }
  return false
}
function call_next(change) {
  let t=week+change
  if(week<t||t<1)
  t=week
  let limit
  if(change!=0 && t<week)
  limit=6
  else 
  limit=new Date().getDay()
  $.ajax({
    headers: { 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI3MGMyM2FiNGRiYTJhODA2NTBlYWQiLCJpYXQiOjE1Nzk2MTczMjV9.eaHnVDFoKfCV3oj2G9DFsSLsiJJGjLZvX-szyMr4Q9w' },
    url: 'routine/'+t,
    type: 'GET',
    success: function (data) {
      for (i = 0; i <= limit; i++) {
        let index = match(data.data, i)
        if (index) {
          for (j = 0; j <= p; j++) {
            let day = data.data[index - 1].day
            //in case a data set wasn't avalable
            try { 
              let top = data.data[index - 1].topic_cover[j] 
            } catch (e) {
               let top = false 
              }
            if (top == true)
             { $('#'+this.id).off('click')
               document.getElementById('col' + day + j).innerHTML = '<i class="fa fa-check"></i>'
              }
            else if (top == false)
              document.getElementById('col' + day + j).innerHTML = '<i class="fa fa-times"></i>'
          }
        }
        else {
          for (j = 0; j <= p; j++) {
            document.getElementById('col' + i + j).innerHTML = '<i class="fa fa-times"></i>'
          }
        }
      }
      for(i=limit+1;i<=6;i++){
        for(j=0;j<=p;j++){
          document.getElementById('col' + i + j).innerHTML = ''
        }
      }
    },
    error: function (error) {
     console.log(error)
    }
  })

  $(document).on('click','.row10',function(e){
    const topic=document.getElementById('col'+this.id).innerHTML
    const id=this.id
     $('#'+this.id).off('click')
    $.ajax({
      headers:{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI3MGMyM2FiNGRiYTJhODA2NTBlYWQiLCJpYXQiOjE1Nzk2MTczMjV9.eaHnVDFoKfCV3oj2G9DFsSLsiJJGjLZvX-szyMr4Q9w'},
      url:'routine',
      type:'POST',
      data:{topic},
      success:function(data){
      const day=new Date().getDay() 
      document.getElementById('col' + day + id).innerHTML = '<i class="fa fa-check"></i>'
      },
      error:function(error){
       console.log(error)
      }
    })
})
}
$('#left').on('click',function(){
  call_next(-1)
})
$('#right').on('click',function(){
  call_next(1)
})